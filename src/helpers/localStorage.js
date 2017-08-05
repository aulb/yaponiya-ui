const localStorage = window.localStorage;

export function saveDataToLocalStorage(key, result) {
  localStorage.setItem(key, JSON.stringify(result));
}

export function getDataFromLocalStorage(key) {
  const stringData = localStorage[key];
  const stringDataExist = stringData !== null && stringData !== undefined;
  if (stringDataExist) return JSON.parse(localStorage[key]);
  return false;
}
