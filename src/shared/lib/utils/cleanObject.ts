type AnyObject = Record<string, any>;

const cleanObject = <T extends AnyObject>(obj: T): T => {
  const cleaned: AnyObject = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (value === null || value === undefined) {
      return;
    }

    if (Array.isArray(value)) {
      const filteredArray = value.filter((item) => {
        if (item === null || item === undefined) {
          return false;
        }

        if (typeof item === 'object') {
          const cleanedItem = cleanObject(item);

          return Object.keys(cleanedItem).length > 0;
        }

        return true;
      });

      if (filteredArray.length > 0) {
        cleaned[key] = filteredArray;
      }
    } else if (typeof value === 'object') {
      const cleanedValue = cleanObject(value);

      if (Object.keys(cleanedValue).length > 0) {
        cleaned[key] = cleanedValue;
      }
    } else {
      cleaned[key] = value;
    }
  });

  return cleaned as T;
};

export { cleanObject };
