export function checkClassNamesAllowed(
  classNames: string | readonly string[],
  allowedNames: readonly string[],
): boolean {
  const rawList =
    typeof classNames === 'string'
      ? classNames.trim().split(/\s+/)
      : classNames;

  const list = rawList.map((e) => e.trim()).filter((e) => e.length > 0);

  if (!list.length) {
    return true;
  }

  const exact = new Set<string>();
  const prefixes: string[] = [];

  for (const allowed of allowedNames) {
    if (allowed.endsWith('*')) {
      prefixes.push(allowed.slice(0, -1));
      continue;
    }
    exact.add(allowed);
  }

  return list.every((className) => {
    if (exact.has(className)) {
      return true;
    }

    return prefixes.some((prefix) => className.startsWith(prefix));
  });
}
