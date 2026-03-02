import { getDefaultValue } from '@hanlogy/react-web-ui/form/getDefaultValue';

describe('getDefaultValue', () => {
  test('text input', () => {
    const element = document.createElement('input');
    element.type = 'text';
    element.defaultValue = 'foo';
    expect(getDefaultValue(element)).toBe('foo');
  });

  test('checkbox input', () => {
    const element = document.createElement('input');
    element.type = 'checkbox';
    element.defaultChecked = true;
    expect(getDefaultValue(element)).toBe(true);
  });

  test('textarea', () => {
    const element = document.createElement('textarea');
    element.defaultValue = 'foo';
    expect(getDefaultValue(element)).toBe('foo');
  });

  test('select', () => {
    const element = document.createElement('select');

    const optionFoo = document.createElement('option');
    optionFoo.value = 'foo';
    optionFoo.defaultSelected = false;
    element.append(optionFoo);

    const optionBar = document.createElement('option');
    optionBar.value = 'bar';
    optionBar.defaultSelected = true;
    element.append(optionBar);

    expect(getDefaultValue(element)).toBe('bar');
  });
});
