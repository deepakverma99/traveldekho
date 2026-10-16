'use client';

import { useRef, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import {
  setScrollState,
  selectCarouselScroll,
} from './slices/scrollSlice';

export interface UseCarouselScrollOptions {
  scrollRatio?: number;
  initialCanScrollRight?: boolean;
}

export const useCarouselScroll = (
  sectionId: string,
  options?: UseCarouselScrollOptions
) => {
  const { scrollRatio = 0.75, initialCanScrollRight = true } = options ?? {};
  const trackRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { canScrollLeft, canScrollRight } = useAppSelector((state) =>
    selectCarouselScroll(state, sectionId, initialCanScrollRight)
  );

  const checkScrollState = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    const hasOverflow = scrollWidth > clientWidth + 6;
    const nextCanScrollLeft = scrollLeft > 10;
    const nextCanScrollRight =
      hasOverflow && scrollLeft + clientWidth < scrollWidth - 10;

    dispatch(
      setScrollState({
        sectionId,
        canScrollLeft: nextCanScrollLeft,
        canScrollRight: nextCanScrollRight,
      })
    );
  }, [dispatch, sectionId]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    checkScrollState();
    track.addEventListener('scroll', checkScrollState, { passive: true });
    window.addEventListener('resize', checkScrollState);

    return () => {
      track.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
    };
  }, [checkScrollState]);

  const handleScroll = useCallback(
    (direction: 'left' | 'right') => {
      if (!trackRef.current) return;
      const scrollAmount = trackRef.current.clientWidth * scrollRatio;
      trackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    },
    [scrollRatio]
  );

  return {
    trackRef,
    canScrollLeft,
    canScrollRight,
    handleScroll,
    checkScrollState,
  };
};
