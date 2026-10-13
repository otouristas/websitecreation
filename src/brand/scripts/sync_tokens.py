#!/usr/bin/env python3
"""Regenerate web/native token exports from JSON; --check fails on drift.
Python 3 standard library only. Does not modify logo geometry or app-icon artwork.
"""
from pathlib import Path
import argparse, colorsys, csv, io, json, re, sys
ROOT = Path(__file__).resolve().parents[1]

def kebab(s):
    return re.sub(r'(?<!^)(?=[A-Z])', '-', s).lower()

def rgb(c):
    if not re.fullmatch(r'#[0-9a-fA-F]{6}', c):
        raise ValueError('Expected sRGB #RRGGBB: ' + str(c))
    return tuple(int(c[i:i+2], 16) / 255 for i in (1, 3, 5))

def hsl(c):
    h, l, s = colorsys.rgb_to_hls(*rgb(c))
    return f'{h*360:.5f} {s*100:.5f}% {l*100:.5f}%'

def ui(c):
    return 'UIColor(red: %.8f, green: %.8f, blue: %.8f, alpha: 1)' % rgb(c)

def luminance(c):
    channels = [v / 12.92 if v <= .04045 else ((v + .055) / 1.055)**2.4 for v in rgb(c)]
    return sum(a*b for a, b in zip(channels, (.2126, .7152, .0722)))

def contrast(a, b):
    a, b = sorted((luminance(a), luminance(b)), reverse=True)
    return (a + .05) / (b + .05)

def build(t):
    brand, themes = t['brand'], t['themes']
    light, dark = themes['light'], themes['dark']
    if set(light) != set(dark):
        raise ValueError('Theme key sets differ')
    for values in [brand, light, dark]:
        for value in values.values():
            rgb(value)
    generated = 'Generated from tokens/brand.tokens.json; do not edit independently.'
    decl = lambda d, prefix='': '\n'.join(f'  --asg-{prefix}{kebab(k)}: {v};' for k, v in d.items())
    grad = t['gradient']
    gradient = 'linear-gradient(' + str(grad['angle']) + 'deg, ' + ', '.join(f'{s["color"]} {s["offset"]*100:g}%' for s in grad['stops']) + ')'
    css = f'/* {generated}\nFull CSS colors, NOT HSL channels. Keep the existing single theme controller. */\n:root {{\n' + decl(brand, 'brand-') + '\n  --asg-brand-gradient: ' + gradient + ';\n}\n'
    for name, vals in themes.items():
        sel = ':root, [data-asg-theme="light"]' if name == 'light' else ':root.dark, :root[data-theme="dark"], [data-asg-theme="dark"]'
        css += sel + ' {\n  color-scheme: ' + name + ';\n' + decl(vals) + '\n}\n'
    swift = '// ' + generated + '\nimport SwiftUI\nimport UIKit\n\nenum ASGBrand {\n'
    for k, v in brand.items():
        swift += f'    static let {k} = Color(uiColor: {ui(v)})\n'
    swift += '}\n\nenum ASGTheme {\n'
    for k, v in light.items():
        swift += f'    static let {k} = Color(uiColor: UIColor {{ traits in\n        traits.userInterfaceStyle == .dark ? {ui(dark[k])} : {ui(v)}\n    }})\n'
    swift += '}\n'
    aliases = {'background':'background','foreground':'text','card':'surface','card-foreground':'text','popover':'surfaceRaised','popover-foreground':'text','primary':'action','primary-foreground':'actionForeground','secondary':'surfaceRaised','secondary-foreground':'text','muted':'surfaceRaised','muted-foreground':'textMuted','accent':'selected','accent-foreground':'selectedForeground','destructive':'danger','border':'borderSubtle','input':'borderControl','ring':'focus','sidebar-background':'surface','sidebar-foreground':'text','sidebar-primary':'action','sidebar-primary-foreground':'actionForeground','sidebar-accent':'selected','sidebar-accent-foreground':'selectedForeground','sidebar-border':'borderSubtle','sidebar-ring':'focus'}
    bridge = '/* ' + generated + '\nHSL-channel adapter ONLY for existing hsl(var(--...)) consumers. */\n'
    for name, vals in themes.items():
        sel = ':root, [data-asg-theme="light"]' if name == 'light' else ':root.dark, :root[data-theme="dark"], [data-asg-theme="dark"]'
        bridge += sel + ' {\n' + ''.join(f'  --{k}: {hsl(vals[v])};\n' for k, v in aliases.items())
        bridge += '  --destructive-foreground: ' + hsl('#FFFFFF' if name == 'light' else brand['ink']) + ';\n'
        bridge += ''.join(f'  --chart-{i}: {hsl(vals[f"chart{i}"])};\n' for i in range(1, 6)) + '}\n'
    rows = []
    for name, vals in themes.items():
        pairs = [(fg, bg, 4.5) for fg in ['text', 'textSecondary', 'textMuted', 'link'] for bg in ['background', 'surface', 'surfaceRaised']]
        pairs += [('actionForeground', bg, 4.5) for bg in ['action', 'actionHover', 'actionPressed']]
        pairs += [('selectedForeground', 'selected', 4.5)]
        pairs += [(fg, bg, 3) for fg in ['borderControl', 'focus'] for bg in ['surface', 'background', 'surfaceRaised']]
        pairs += [(role, role+'Surface', 4.5) for role in ['success', 'warning', 'danger', 'info']]
        pairs += [(f'chart{i}', bg, 3) for i in range(1, 6) for bg in ['surface', 'background', 'surfaceRaised']]
        for fg, bg, minimum in pairs:
            r = contrast(vals[fg], vals[bg])
            if r < minimum:
                raise ValueError(f'Contrast failed: {name}/{fg}/{bg} = {r:.8f} < {minimum}')
            rows.append(dict(theme=name, foreground_token=fg, background_token=bg, foreground=vals[fg], background=vals[bg], ratio=f'{r:.6f}', minimum=minimum, result='PASS'))
    out = io.StringIO(newline='')
    writer = csv.DictWriter(out, fieldnames=rows[0].keys(), lineterminator='\n')
    writer.writeheader(); writer.writerows(rows)
    return {'tokens/brand.tokens.css':css, 'tokens/brand.tokens.ts':'// '+generated+'\nexport const asgTokens = '+json.dumps(t, indent=2)+' as const;\n', 'adapters/ASGTheme.swift':swift, 'adapters/shadcn-hsl.css':bridge, 'qa/token-contrast.csv':out.getvalue()}, len(rows)

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Fail instead of writing when generated files differ.')
    args = parser.parse_args()
    try:
        t = json.loads((ROOT/'tokens/brand.tokens.json').read_text())
        files, count = build(t)
        drift = []
        for path, content in files.items():
            target = ROOT/path
            if args.check:
                if not target.exists() or target.read_text() != content:
                    drift.append(path)
            else:
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_text(content)
        if drift:
            print('Generated token files have drifted: '+', '.join(drift), file=sys.stderr)
            return 1
        print(f'{len(files)} exports synchronized; {count} opaque token contrast checks passed. No rendered UI audit is implied.')
        return 0
    except (OSError, ValueError, KeyError, TypeError) as exc:
        print(str(exc), file=sys.stderr)
        return 1

if __name__ == '__main__':
    raise SystemExit(main())
