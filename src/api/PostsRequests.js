import axios from 'axios'
import BASE_URL from '../api/ConstHelper';


const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const getTimelinePosts = (id) => API.get(`/posts/${id}/timeline`);
export const likePost = (id, userId) => API.put(`posts/${id}/like`, { userId: userId })
export const getPost=(id)=>API.get(`/posts/${id}`)
//Post comments
export const commentOnPost = (id, { userId, message }) => API.post(`posts/${id}/comments`, { userId: userId, message: message })