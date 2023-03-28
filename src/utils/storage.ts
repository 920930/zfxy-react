export const getLocalStorage = <T>(key: string, initValue: T): T => {
  const val = localStorage.getItem(key);
  return val ? typeof initValue === 'object' ? JSON.parse(val) : val : initValue;
};

export const setLocalStorage = (key: string, val: any) => {
  let value = typeof val === 'object' && val != null ? JSON.stringify(val) : val;
  localStorage.setItem(key, value)
};

export const clearStorage = () => localStorage.clear()