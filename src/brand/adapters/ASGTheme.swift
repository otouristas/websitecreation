// Generated from tokens/brand.tokens.json; do not edit independently.
import SwiftUI
import UIKit

enum ASGBrand {
    static let blue = Color(uiColor: UIColor(red: 0.00000000, green: 0.48235294, blue: 1.00000000, alpha: 1))
    static let cyan = Color(uiColor: UIColor(red: 0.18431373, green: 0.77647059, blue: 0.95686275, alpha: 1))
    static let teal = Color(uiColor: UIColor(red: 0.09411765, green: 0.74901961, blue: 0.68235294, alpha: 1))
    static let mint = Color(uiColor: UIColor(red: 0.47058824, green: 0.90196078, blue: 0.63921569, alpha: 1))
    static let ink = Color(uiColor: UIColor(red: 0.01960784, green: 0.05098039, blue: 0.10196078, alpha: 1))
    static let paper = Color(uiColor: UIColor(red: 0.96078431, green: 0.96862745, blue: 0.98431373, alpha: 1))
}

enum ASGTheme {
    static let background = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.01960784, green: 0.05098039, blue: 0.10196078, alpha: 1) : UIColor(red: 0.96078431, green: 0.96862745, blue: 0.98431373, alpha: 1)
    })
    static let surface = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.04705882, green: 0.09019608, blue: 0.15686275, alpha: 1) : UIColor(red: 1.00000000, green: 1.00000000, blue: 1.00000000, alpha: 1)
    })
    static let surfaceRaised = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.07450980, green: 0.13333333, blue: 0.22745098, alpha: 1) : UIColor(red: 0.92156863, green: 0.94117647, blue: 0.96862745, alpha: 1)
    })
    static let text = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.96078431, green: 0.96862745, blue: 0.98431373, alpha: 1) : UIColor(red: 0.04313725, green: 0.08235294, blue: 0.14901961, alpha: 1)
    })
    static let textSecondary = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.72941176, green: 0.77647059, blue: 0.84705882, alpha: 1) : UIColor(red: 0.25882353, green: 0.32549020, blue: 0.41960784, alpha: 1)
    })
    static let textMuted = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.58039216, green: 0.64313725, blue: 0.73725490, alpha: 1) : UIColor(red: 0.34901961, green: 0.41568627, blue: 0.50196078, alpha: 1)
    })
    static let borderSubtle = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.14901961, green: 0.20784314, blue: 0.30196078, alpha: 1) : UIColor(red: 0.84705882, green: 0.88235294, blue: 0.92941176, alpha: 1)
    })
    static let borderControl = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.40000000, green: 0.47450980, blue: 0.58431373, alpha: 1) : UIColor(red: 0.46666667, green: 0.52941176, blue: 0.61960784, alpha: 1)
    })
    static let action = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.18431373, green: 0.77647059, blue: 0.95686275, alpha: 1) : UIColor(red: 0.02745098, green: 0.36078431, blue: 0.89803922, alpha: 1)
    })
    static let actionForeground = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.01960784, green: 0.05098039, blue: 0.10196078, alpha: 1) : UIColor(red: 1.00000000, green: 1.00000000, blue: 1.00000000, alpha: 1)
    })
    static let actionHover = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.39607843, green: 0.83529412, blue: 0.96470588, alpha: 1) : UIColor(red: 0.02352941, green: 0.30980392, blue: 0.77254902, alpha: 1)
    })
    static let actionPressed = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.10196078, green: 0.64705882, blue: 0.82352941, alpha: 1) : UIColor(red: 0.01568627, green: 0.25882353, blue: 0.65882353, alpha: 1)
    })
    static let actionDisabled = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.13725490, green: 0.19607843, blue: 0.28627451, alpha: 1) : UIColor(red: 0.88627451, green: 0.90980392, blue: 0.94117647, alpha: 1)
    })
    static let actionDisabledForeground = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.63921569, green: 0.69411765, blue: 0.77254902, alpha: 1) : UIColor(red: 0.34509804, green: 0.40392157, blue: 0.47450980, alpha: 1)
    })
    static let link = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.38039216, green: 0.81176471, blue: 1.00000000, alpha: 1) : UIColor(red: 0.02745098, green: 0.36078431, blue: 0.89803922, alpha: 1)
    })
    static let focus = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.38039216, green: 0.81176471, blue: 1.00000000, alpha: 1) : UIColor(red: 0.02745098, green: 0.36078431, blue: 0.89803922, alpha: 1)
    })
    static let selected = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.07058824, green: 0.19215686, blue: 0.29019608, alpha: 1) : UIColor(red: 0.89803922, green: 0.94117647, blue: 1.00000000, alpha: 1)
    })
    static let selectedForeground = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.38039216, green: 0.81176471, blue: 1.00000000, alpha: 1) : UIColor(red: 0.02352941, green: 0.30980392, blue: 0.77254902, alpha: 1)
    })
    static let success = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.47058824, green: 0.90196078, blue: 0.63921569, alpha: 1) : UIColor(red: 0.07450980, green: 0.45882353, blue: 0.28235294, alpha: 1)
    })
    static let successSurface = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.06274510, green: 0.17647059, blue: 0.13725490, alpha: 1) : UIColor(red: 0.90980392, green: 0.97254902, blue: 0.93725490, alpha: 1)
    })
    static let warning = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.95294118, green: 0.76470588, blue: 0.41960784, alpha: 1) : UIColor(red: 0.54117647, green: 0.31372549, blue: 0.00000000, alpha: 1)
    })
    static let warningSurface = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.20392157, green: 0.15686275, blue: 0.08235294, alpha: 1) : UIColor(red: 1.00000000, green: 0.95294118, blue: 0.83921569, alpha: 1)
    })
    static let danger = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 1.00000000, green: 0.55294118, blue: 0.63137255, alpha: 1) : UIColor(red: 0.70588235, green: 0.13725490, blue: 0.23529412, alpha: 1)
    })
    static let dangerSurface = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.21176471, green: 0.10980392, blue: 0.16078431, alpha: 1) : UIColor(red: 0.99215686, green: 0.92549020, blue: 0.94117647, alpha: 1)
    })
    static let info = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.38039216, green: 0.81176471, blue: 1.00000000, alpha: 1) : UIColor(red: 0.02745098, green: 0.36078431, blue: 0.89803922, alpha: 1)
    })
    static let infoSurface = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.07058824, green: 0.19215686, blue: 0.29019608, alpha: 1) : UIColor(red: 0.89803922, green: 0.94117647, blue: 1.00000000, alpha: 1)
    })
    static let chart1 = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.38039216, green: 0.81176471, blue: 1.00000000, alpha: 1) : UIColor(red: 0.02745098, green: 0.36078431, blue: 0.89803922, alpha: 1)
    })
    static let chart2 = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.21568627, green: 0.82745098, blue: 0.77254902, alpha: 1) : UIColor(red: 0.03137255, green: 0.48235294, blue: 0.52549020, alpha: 1)
    })
    static let chart3 = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.47058824, green: 0.90196078, blue: 0.63921569, alpha: 1) : UIColor(red: 0.07450980, green: 0.45882353, blue: 0.28235294, alpha: 1)
    })
    static let chart4 = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 0.95294118, green: 0.76470588, blue: 0.41960784, alpha: 1) : UIColor(red: 0.54117647, green: 0.31372549, blue: 0.00000000, alpha: 1)
    })
    static let chart5 = Color(uiColor: UIColor { traits in
        traits.userInterfaceStyle == .dark ? UIColor(red: 1.00000000, green: 0.55294118, blue: 0.63137255, alpha: 1) : UIColor(red: 0.70588235, green: 0.13725490, blue: 0.23529412, alpha: 1)
    })
}
