"use client";

import { useEffect } from "react";

let lockCount = 0;
let originalOverflow = "";

export function useOverlay(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    if (lockCount === 0) {
      originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    lockCount += 1;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = originalOverflow;
      }
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);
}
