import { getControlElementValue } from './getControlElementValue';
import type {
  FormControlElement,
  FormDataConstraint,
  FormFieldsCollectionOptions,
  KeyOfFormData,
} from './types';

// TODO: Optimise type safe. A lot of type casting now.
// But it is an internal helper for useForm, it is safe.
export function collectValues<
  FormDataT extends FormDataConstraint<FormDataT>,
  FormFieldNameT extends KeyOfFormData<FormDataT>,
>(
  elements: Partial<Record<FormFieldNameT, FormControlElement | null>>,
  unattachedValues: Partial<FormDataT>,
  {
    allFields = false,
    fields,
  }: FormFieldsCollectionOptions<FormFieldNameT> = {},
): Partial<FormDataT> {
  const mountedValues: Partial<FormDataT> = {};

  for (const key in elements) {
    const fieldName = key as FormFieldNameT;

    const ref = elements[fieldName];
    if (!ref) {
      continue;
    }

    mountedValues[fieldName] = getControlElementValue(
      ref,
    ) as FormDataT[FormFieldNameT];
  }
  if (!allFields && !fields) {
    return mountedValues;
  }

  const allValues = { ...unattachedValues, ...mountedValues };

  if (allFields || !fields) {
    return allValues;
  }

  return Object.fromEntries(
    Object.entries(allValues).filter(([name]) =>
      fields.includes(name as FormFieldNameT),
    ),
  ) as Partial<FormDataT>;
}
