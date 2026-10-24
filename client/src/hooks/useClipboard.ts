'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

export interface UseClipboardOptions {
  /** Timeout in milliseconds before resetting the copied state. Defaults to 2000ms. */
  timeout?: number;
  /** Callback fired immediately after text is successfully copied */
  onSuccess?: (text: string) => void;
  /** Callback fired when copying fails */
  onError?: (error: unknown) => void;
}

export interface UseClipboardReturn {
  /** Function to copy text to the clipboard. Returns true if successful. */
  copy: (text: string) => Promise<boolean>;
  /** Whether content was recently copied (resets after timeout) */
  isCopied: boolean;
  /** Alias for isCopied */
  hasCopied: boolean;
  /** The most recently copied text string, or null */
  copiedText: string | null;
  /** Manually reset the copied state before timeout expires */
  reset: () => void;
}

/**
 * Enterprise-grade, reusable custom hook for copying text to clipboard.
 * Features:
 * - Modern navigator.clipboard API with automatic fallback for non-secure/legacy environments
 * - Auto-resetting `isCopied` flag with configurable duration
 * - Memory leak safe with unmount timer cleanup
 * - Callbacks for success/error handling
 *
 * @example
 * const { copy, isCopied } = useClipboard({ timeout: 2000 });
 * <button onClick={() => copy('Hello World')}>{isCopied ? 'Copied!' : 'Copy'}</button>
 */
export const useClipboard = (options: UseClipboardOptions = {}): UseClipboardReturn => {
  const { timeout = 2000, onSuccess, onError } = options;
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear pending timer on component unmount to prevent state updates
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsCopied(false);
    setCopiedText(null);
  }, []);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (typeof window === 'undefined') {
        return false;
      }

      // Clear any active timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      try {
        if (navigator?.clipboard?.writeText && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          // Robust fallback for non-HTTPS or legacy browsers
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          textArea.setAttribute('readonly', '');
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          const successful = document.execCommand('copy');
          document.body.removeChild(textArea);
          if (!successful) {
            throw new Error('execCommand copy returned false');
          }
        }

        setIsCopied(true);
        setCopiedText(text);
        onSuccess?.(text);

        timeoutRef.current = setTimeout(() => {
          setIsCopied(false);
          setCopiedText(null);
          timeoutRef.current = null;
        }, timeout);

        return true;
      } catch (err) {
        onError?.(err);
        return false;
      }
    },
    [timeout, onSuccess, onError]
  );

  return {
    copy,
    isCopied,
    hasCopied: isCopied,
    copiedText,
    reset,
  };
};
