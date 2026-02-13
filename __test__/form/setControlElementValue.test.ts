import { setControlElementValue } from '../../lib/form/setControlElementValue';

describe('setControlElementValue', () => {
  describe('checkbox', () => {
    let element: HTMLInputElement;

    beforeEach(() => {
      element = document.createElement('input');
      element.type = 'checkbox';
    });

    test('unchecked to checked', () => {
      expect(element.checked).toBe(false);
      setControlElementValue(element, true);
      expect(element.checked).toBe(true);
    });

    test('unchecked to unchecked', () => {
      expect(element.checked).toBe(false);
      setControlElementValue(element, false);
      expect(element.checked).toBe(false);
    });

    test('checked to unchecked', () => {
      element.checked = true;
      expect(element.checked).toBe(true);
      setControlElementValue(element, false);
      expect(element.checked).toBe(false);
    });

    test('checked to checked', () => {
      element.checked = true;
      expect(element.checked).toBe(true);
      setControlElementValue(element, true);
      expect(element.checked).toBe(true);
    });

    test('not a boolean value', () => {
      expect(element.checked).toBe(false);
      setControlElementValue(element, '1');
      expect(element.checked).toBe(false);
    });
  });

  describe('string value elements', () => {
    test('set with undefined value', () => {
      const element = document.createElement('input');
      setControlElementValue(element, undefined);
      expect(element.value).toBe('');
    });

    test('input', () => {
      const element = document.createElement('input');
      setControlElementValue(element, 'foo');
      expect(element.value).toBe('foo');
    });

    test('textarea', () => {
      const element = document.createElement('textarea');
      setControlElementValue(element, 'foo');
      expect(element.value).toBe('foo');
    });

    test('select', () => {
      const element = document.createElement('select');
      const optionFoo = document.createElement('option');
      optionFoo.value = 'foo';
      optionFoo.textContent = 'Foo';
      element.append(optionFoo);

      setControlElementValue(element, 'foo');
      expect(element.value).toBe('foo');
    });
  });
});
