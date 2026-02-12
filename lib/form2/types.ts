// Elements that form controller supports attaching a ref to.
export type FormControlElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

export type KeyOfFormData<T extends object> = Extract<keyof T, string>;

export type FormFieldValue = string | boolean;
