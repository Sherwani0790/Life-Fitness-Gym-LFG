export const maskCNIC = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 13);
  let masked = '';
  if (digits.length > 0) {
    masked += digits.slice(0, 5);
    if (digits.length > 5) {
      masked += '-' + digits.slice(5, 12);
      if (digits.length > 12) {
        masked += '-' + digits.slice(12, 13);
      }
    }
  }
  return masked;
};

export const maskPhone = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  let masked = '';
  if (digits.length > 0) {
    masked += digits.slice(0, 4);
    if (digits.length > 4) {
      masked += '-' + digits.slice(4, 11);
    }
  }
  return masked;
};

export const onlyAlphabets = (value: string) => {
  return value.replace(/[^a-zA-Z\s]/g, '');
};

export const onlyNumbers = (value: string) => {
  return value.replace(/\D/g, '');
};

export const onlyAlphanumeric = (value: string) => {
  return value.replace(/[^a-zA-Z0-9\s]/g, '');
};
