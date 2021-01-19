interface CheckCondition {
  format: string[];
  size: number;
}
type ErrorType = 'size' | 'format' | null;
export const checkBeforeUpload = (file: File, condition: CheckCondition) => {
  const { format, size } = condition;
  const isValidateFormat = format ? format.includes(file.type) : true;
  const isValidateSize = size ? file.size / 1024 / 1024 < size : true;
  let error: ErrorType = null;
  // if (!isValidateFormat) {
  //   error = 'format';
  // }
  // if (!isValidateSize) {
  //   error = 'size';
  // }
  error = !isValidateFormat ? 'format' : !isValidateSize ? 'size' : null;
  return {
    passed: isValidateFormat && isValidateSize,
    error
  };
};

export const objToArr = <T>(obj: { [key: string]: T }) => {
  return Object.keys(obj).map((key) => obj[key]);
};

export const arrToObj = <T extends { id?: string }>(arr: Array<T>) => {
  return arr.reduce((prev, current) => {
    if (current.id) {
      prev[current.id] = current;
    }
    return prev;
  }, {} as { [key: string]: T });
};
