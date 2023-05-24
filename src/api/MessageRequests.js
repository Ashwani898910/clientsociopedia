import axios from 'axios'
import BASE_URL from '../api/ConstHelper';


const API = axios.create({ baseURL: BASE_URL });

export const getMessages = (id) => API.get(`/message/${id}`);

export const addMessage = (data) => API.post('/message/', data);