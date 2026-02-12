import { getControlElementValue } from '../../lib/form2/getControlElementValue';

describe('getControlElementValue', () => {
  test('checkbox', () => {
    const element = document.createElement('input');
    element.type = 'checkbox';

    expect(getControlElementValue(element)).toBe(false);

    element.checked = true;
    expect(getControlElementValue(element)).toBe(true);
  });

  test('input', () => {
    const element = document.createElement('input');

    element.value = 'foo';
    expect(getControlElementValue(element)).toBe('foo');
  });

  test('textarea', () => {
    const element = document.createElement('textarea');

    element.value = 'foo';
    expect(getControlElementValue(element)).toBe('foo');
  });

  test('select', () => {
    const element = document.createElement('select');
    const optionFoo = document.createElement('option');
    optionFoo.value = 'foo';
    element.append(optionFoo);

    expect(getControlElementValue(element)).toBe('foo');
  });
});
