import type { FormFieldRegister } from '@hanlogy/react-web-ui';

export function ChildForm({
  register,
}: {
  register: FormFieldRegister<{
    description: string;
  }>;
}) {
  register('description');
  return null;
}
