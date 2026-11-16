/**
 * Smoothly scrolls to a form field by its ID and brings it into focus.
 * Uses center block alignment so sticky headers and toolbars never obscure the field.
 */
export const scrollToAndHighlightField = (fieldId: string) => {
  if (typeof window === 'undefined' || !fieldId) return;

  // Use requestAnimationFrame + setTimeout to ensure DOM is ready after React re-render
  requestAnimationFrame(() => {
    setTimeout(() => {
      const el = document.getElementById(fieldId);
      if (!el) return;

      // Center element in viewport
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });

      // Focus the element or its first focusable input child
      const focusable = el.matches('input, select, textarea, button, [tabindex="0"]')
        ? el
        : el.querySelector<HTMLElement>('input, select, textarea, button, [tabindex="0"]');

      if (focusable) {
        try {
          focusable.focus({ preventScroll: true });
        } catch {
          focusable.focus();
        }
      }
    }, 80);
  });
};

