export const getFromLocalStorage = (name) => {
  return localStorage.getItem(name);
};

export const setToLocalStorage = (name, data) => {
  localStorage.setItem(name, data);
};
export const removeFromLocalStorage = (name) => {
  localStorage.removeItem(name);
};
