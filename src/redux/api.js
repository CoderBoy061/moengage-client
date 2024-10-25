const mainUrl = import.meta.env.VITE_REACT_APP_URL;

const loginUrl = `${mainUrl}/user/login`;

const registerUrl = `${mainUrl}/user/create`;

const logoutUrl = `${mainUrl}/user/logout`;

const getUserUrl = `${mainUrl}/user/get`;

const addListUrl = `${mainUrl}/list/save`;
const removeListUrl = `${mainUrl}/list/remove`;
const updateListUrl = `${mainUrl}/list/update`;
const getAllListUrl = `${mainUrl}/list/getall`;

export { loginUrl, registerUrl, logoutUrl, getUserUrl, addListUrl, removeListUrl, updateListUrl, getAllListUrl };