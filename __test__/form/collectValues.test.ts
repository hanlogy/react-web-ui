import { collectValues } from '../../lib/form/collectValues';

const getControlElementValueMock = jest.fn(
  (element: { value?: string; checked?: boolean }) => {
    if (element.value !== undefined) {
      return element.value;
    }

    if (element.checked !== undefined) {
      return element.checked;
    }
  },
);

jest.mock('../../lib/form/getControlElementValue', () => {
  return {
    getControlElementValue: (element: {
      value?: string;
      checked?: boolean;
    }) => {
      return getControlElementValueMock(element);
    },
  };
});

interface FormData {
  firstName: string;
  isAgree: boolean;
  note?: string;
}

function createTextElement(value: unknown): HTMLInputElement {
  return { value } as HTMLInputElement;
}

function createCheckboxElement(checked: boolean): HTMLInputElement {
  return { checked } as HTMLInputElement;
}

beforeEach(() => {
  getControlElementValueMock.mockClear();
});

test('mounted only', () => {
  const elements = {
    firstName: createTextElement('Baz'),
    isAgree: createCheckboxElement(true),
  };

  const unattachedValues: Partial<FormData> = {
    note: 'Foo',
  };

  const result = collectValues(elements, unattachedValues);

  expect(result).toEqual({ firstName: 'Baz', isAgree: true });
  expect(getControlElementValueMock).toHaveBeenCalledTimes(2);
});

test('all fields', () => {
  const elements = {
    firstName: createTextElement('Baz'),
    isAgree: createCheckboxElement(false),
  };

  const unattachedValues: Partial<FormData> = {
    note: 'Foo',
  };

  const result = collectValues(elements, unattachedValues, {
    allFields: true,
  });

  expect(result).toEqual({ firstName: 'Baz', isAgree: false, note: 'Foo' });
});

test('fields subset', () => {
  const elements = {
    firstName: createTextElement('Baz'),
    isAgree: createCheckboxElement(true),
  };

  const unattachedValues: Partial<FormData> = {
    note: 'Foo',
  };

  const result = collectValues(elements, unattachedValues, {
    fields: ['isAgree'],
  });

  expect(result).toEqual({ isAgree: true });
});

test('null ref', () => {
  const elements = {
    firstName: null,
    isAgree: createCheckboxElement(true),
  };

  const unattachedValues: Partial<FormData> = {
    firstName: 'F',
  };

  const result = collectValues(elements, unattachedValues);

  expect(result).toEqual({ isAgree: true });
});

test('empty fields', () => {
  const elements = {
    firstName: createTextElement('Baz'),
    isAgree: createCheckboxElement(true),
  };

  const unattachedValues: Partial<FormData> = {
    note: 'Foo',
  };

  const result = collectValues(elements, unattachedValues, {
    fields: [],
  });

  expect(result).toEqual({});
});
