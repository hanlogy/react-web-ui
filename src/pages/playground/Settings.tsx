import type { FormManager } from './useForm';

interface FormData {
  name: string;
  isAgree: boolean;
}

export function Settings({
  formManager,
}: {
  formManager: FormManager<FormData>;
}) {
  console.log(formManager);
  return null;
}
