export function hasRingClass(className?: string | undefined): boolean {
  return /\bring-/.test(className ?? '');
}

export function hasWidthClass(className?: string): boolean {
  return /\b(?:w-|min-w-|max-w-|size-)/.test(className ?? '');
}

export function hasHeightClass(className?: string): boolean {
  return /\b(?:h-|min-h-|max-h-|size-)/.test(className ?? '');
}
