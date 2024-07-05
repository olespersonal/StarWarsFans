export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const replaceUnderscoresWithSpaces = (key: string): string => {
  return key.replace(/_/g, ' ');
};
