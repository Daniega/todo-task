//save data in localStorage
export const saveToLocalStorage = (key, data) => {
	localStorage.setItem(key, JSON.stringify({ data }));
};
//get data from localStorage
export const getFromLocalStorage = (key) => {
	return JSON.parse(localStorage.getItem(key));
};
