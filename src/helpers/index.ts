export const generateId = () =>
  Math.random().toString(36).slice(2, 10) + '-' + Date.now();

export const isDefined = (val: any) => val !== null && val !== undefined;
