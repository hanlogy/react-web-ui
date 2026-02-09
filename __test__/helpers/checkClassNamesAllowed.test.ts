import { checkClassNamesAllowed } from '@hanlogy/react-web-ui/helpers/checkClassNamesAllowed';

describe('checkClassNamesAllowed', () => {
  test('empty string', () => {
    expect(checkClassNamesAllowed('', ['flex-1'])).toBe(true);
  });

  test('whitespace only', () => {
    expect(checkClassNamesAllowed('   \n  ', ['flex-1'])).toBe(true);
  });

  test('single exact match', () => {
    expect(checkClassNamesAllowed('flex-1', ['flex-1', 'h-full'])).toBe(true);
  });

  test('multiple exact matches', () => {
    expect(checkClassNamesAllowed('flex-1 h-full', ['flex-1', 'h-full'])).toBe(
      true,
    );
  });

  test('one not allowed', () => {
    expect(checkClassNamesAllowed('flex-1 p-2', ['flex-1', 'h-full'])).toBe(
      false,
    );
  });

  test('wildcard prefix match', () => {
    expect(checkClassNamesAllowed('bg-amber-300', ['bg-*'])).toBe(true);
  });

  test('wildcard prefix mismatch', () => {
    expect(checkClassNamesAllowed('text-amber-300', ['bg-*'])).toBe(false);
  });

  test('array input allowed', () => {
    expect(
      checkClassNamesAllowed(['flex-1', 'h-full'], ['flex-1', 'h-full']),
    ).toBe(true);
  });

  test('array input trims and ignores empty', () => {
    expect(checkClassNamesAllowed(['  flex-1  ', '', '   '], ['flex-1'])).toBe(
      true,
    );
  });

  test('star wildcard allows everything', () => {
    expect(checkClassNamesAllowed('anything goes-here', ['*'])).toBe(true);
  });
});
