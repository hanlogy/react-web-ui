import type { ComponentProps } from 'react';
import type {
  FormDataBase,
  FormFieldController,
  InputPropsForForm,
  KeyOfFormData,
} from './types';

export function HiddenField<
  FormDataT extends FormDataBase<FormDataT>,
  FormFieldNameT extends KeyOfFormData<FormDataT>,
  FormFieldValueT extends FormDataT[FormFieldNameT],
>({
  controller: { ref, name },
}: {
  controller: FormFieldController<FormDataT, FormFieldNameT, FormFieldValueT>;
} & InputPropsForForm<Omit<ComponentProps<'input'>, 'type'>>) {
  return <input name={name} ref={ref} type="hidden" />;
}
