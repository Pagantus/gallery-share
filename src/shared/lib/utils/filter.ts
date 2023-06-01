const findString = (input: string, text: string) => {
  return text.toLowerCase().includes(input.toLowerCase());
};

const filterOption = (
  input: string,
  option:
    | {
        value: string;
        label: string;
      }
    | undefined
) => {
  return findString(input, option?.label ?? '');
};

export { findString, filterOption };
