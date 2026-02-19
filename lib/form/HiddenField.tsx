import type { ComponentProps } from 'react';
import type {
  FormDataConstraint,
  FormFieldController,
  InputPropsForForm,
  KeyOfFormData,
} from './types';

export function HiddenField<
  FormDataT extends FormDataConstraint<FormDataT>,
  FormFieldNameT extends KeyOfFormData<FormDataT>,
  FormFieldValueT extends FormDataT[FormFieldNameT],
>({
  controller: { ref, name },
  ...rest
}: {
  controller: FormFieldController<FormDataT, FormFieldNameT, FormFieldValueT>;
} & InputPropsForForm<Omit<ComponentProps<'input'>, 'type'>>) {
  return <input {...rest} name={name} ref={ref} type="hidden" />;
}
