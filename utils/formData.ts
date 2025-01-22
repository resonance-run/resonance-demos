import { insertValueAtPath } from './object';

export const extractObjectFromFormData = (formData: FormData) => {
  const formEntries = Array.from(formData.entries());
  // Because we will use bracket notation, we want to prevent prototype pollution by creating
  // an object with no prototype
  const obj = Object.create(null);
  formEntries.forEach(([key, value]) => {
    let val: string | number | boolean | File = value;
    if (formData.get(`${key}.unset`)) {
      val = '';
    }
    // To manage checkboxes, the <Input type="checkbox" /> adds a hidden field with name={`${key}.isCheckbox`},
    // that way we can turn checkbox values into booleans
    if (formData.get(`${key}.isCheckbox`)) {
      val = formData.get(key) === 'isChecked';
    }

    if (
      !/\.unset$/.test(key) &&
      !/\.isCheckbox$/.test(key) &&
      (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean')
    ) {
      insertValueAtPath(obj, val, key);
    }
  });
  return obj;
};
