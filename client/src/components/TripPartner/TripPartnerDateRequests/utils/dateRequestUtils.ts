/**
 * Utility functions for Trip Partner Date Requests
 */

export const formatDateRange = (start: string, end: string): string => {
  try {
    const s = new Date(start);
    const e = new Date(end);
    const sStr = s.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    const eStr = e.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    return `${sStr} - ${eStr}`;
  } catch {
    return `${start} to ${end}`;
  }
};

export const calculateDurationDays = (start: string, end: string): number => {
  try {
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  } catch {
    return 1;
  }
};
