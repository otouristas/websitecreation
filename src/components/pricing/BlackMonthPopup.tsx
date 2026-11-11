"use client";

import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import {
  currentPriceIncludesVat,
  OFFER_ENDS,
  formatPrice,
  seoPackages,
  websitePackages,
  withVat,
} from "@/data/pricing";
import styles from "./BlackMonthPopup.module.css";

const DISMISSED_KEY = "asg-black-month-2026-vat-gift-seen";

/** Marketing campaign for agency services. Software subscription amounts remain unchanged. */
export function BlackMonthPopup({ enabled }: { enabled: boolean }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      /* A blocked store must not prevent closing. */
    }
  }, []);

  useEffect(() => {
    if (!enabled || !currentPriceIncludesVat(websitePackages[0])) return;
    const preview =
      new URLSearchParams(window.location.search).get("preview") ===
      "black-month-popup";
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem(DISMISSED_KEY));
    } catch {
      /* Still show this session's campaign. */
    }
    if (seen && !preview) return;
    let timer: number;
    let observer: MutationObserver | undefined;
    const attempt = () => {
      if (!currentPriceIncludesVat(websitePackages[0])) return;
      // Wait for consent and any active menu, without stealing their focus.
      if (!preview && (!document.documentElement.classList.contains("consent-set") ||
          document.querySelector('dialog[open], [role="dialog"][aria-modal="true"]'))) {
        observer ??= new MutationObserver(() => {
          window.clearTimeout(timer);
          timer = window.setTimeout(attempt, 8000);
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        observer.observe(document.body, { attributes: true, attributeFilter: ["open", "aria-modal"], subtree: true, childList: true });
        return;
      }
      observer?.disconnect();
      setOpen(true);
    };
    timer = window.setTimeout(attempt, preview ? 100 : 8000);
    const expires = window.setTimeout(() => { observer?.disconnect(); window.clearTimeout(timer); setOpen(false); }, Math.max(0, Math.min(2147483647, OFFER_ENDS.getTime() - Date.now() + 1)));
    return () => { window.clearTimeout(timer); window.clearTimeout(expires); observer?.disconnect(); };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const scroll = { x: window.scrollX, y: window.scrollY };
    const previousStyles = document.body.getAttribute("style");
    document.body.style.position = "fixed";
    document.body.style.top = `-${scroll.y}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      if (dialog.open) dialog.close();
      if (previousStyles === null) document.body.removeAttribute("style");
      else document.body.setAttribute("style", previousStyles);
      window.scrollTo({ left: scroll.x, top: scroll.y, behavior: "instant" });
      previousFocus?.focus({ preventScroll: true });
    };
  }, [open, enabled]);

  if (!enabled || !open || !currentPriceIncludesVat(websitePackages[0])) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="black-month-popup-title"
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            "a[href],button:not([disabled]),[tabindex]",
          ),
        ).filter(
          (node) => node.tabIndex >= 0 && node.getClientRects().length > 0,
        );
        if (!controls.length) return;
        const current = controls.indexOf(document.activeElement as HTMLElement);
        const next = event.shiftKey
          ? current <= 0
            ? controls.length - 1
            : current - 1
          : current < 0 || current === controls.length - 1
            ? 0
            : current + 1;
        event.preventDefault();
        controls[next].focus();
      }}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={close}
        className={styles.close}
        aria-label="Κλείσιμο προσφοράς Black Month"
      >
        <X size={20} aria-hidden />
      </button>
      <div className={styles.inner}>
        <Image
          src="/campaigns/black-month-2026/background.webp"
          alt=""
          fill
          sizes="760px"
          className={styles.art}
        />
        <div className={styles.shade} aria-hidden />
        <Image
          src="/brand/asg-lockup-on-dark.svg"
          alt="AnotherSEOGuru"
          width={1128}
          height={256}
          className={styles.logo}
          unoptimized
        />
        <p className={styles.eyebrow}>BLACK MONTH / ΝΟΕΜΒΡΙΟΣ 2026</p>
        <h2 id="black-month-popup-title">
          Ίδια τιμή.
          <br />
          <span>Δώρο και ο ΦΠΑ.</span>
        </h2>
        <p className={styles.lead}>
          Αυτόν τον Νοέμβριο, η αναγραφόμενη τιμή είναι και η τελική. Καλύπτουμε
          τον ΦΠΑ για το επόμενο βήμα της επιχείρησής σας.
        </p>
        <div className={styles.offers}>
          <div>
            <span>Website Starter</span>
            <p className={styles.was}>
              Πριν <del>€{formatPrice(websitePackages[0].regular, "el")}</del> + ΦΠΑ 24%
              <br />
              (€{formatPrice(withVat(websitePackages[0].regular), "el")} με ΦΠΑ)
            </p>
            <strong><span className={styles.now}>Τώρα</span>€{formatPrice(websitePackages[0].offer, "el")}</strong>
            <small>τελική τιμή με ΦΠΑ 24%</small>
          </div>
          <div>
            <span>SEO Foundations</span>
            <p className={styles.was}>
              Πριν <del>€{formatPrice(seoPackages[0].regular, "el")}/μήνα</del> + ΦΠΑ 24%
              <br />
              (€{formatPrice(withVat(seoPackages[0].regular), "el")}/μήνα με ΦΠΑ)
            </p>
            <strong>
              <span className={styles.now}>Τώρα</span>
              €{formatPrice(seoPackages[0].offer, "el")}
              <em>/μήνα</em>
            </strong>
            <small>με ΦΠΑ, σε όλη την εξάμηνη συνεργασία</small>
          </div>
        </div>
        <Link
          href="/el/ypiresies/times#websites"
          className={styles.primary}
          onClick={close}
        >
          Δείτε τα πακέτα Black Month
          <ArrowUpRight size={18} aria-hidden />
        </Link>
        <Link
          href="/el/blog/black-month-istoselides-seo-2026"
          className={styles.article}
          onClick={close}
        >
          Διαβάστε το άρθρο και τους όρους
        </Link>
        <p className={styles.terms}>
          Για νέα έργα που θα επιβεβαιωθούν έως 30/11/2026. SEO: ελάχιστη
          διάρκεια 6 μήνες. Οι τιμές περιλαμβάνουν ΦΠΑ 24%.
        </p>
      </div>
    </dialog>,
    document.body,
  );
}
