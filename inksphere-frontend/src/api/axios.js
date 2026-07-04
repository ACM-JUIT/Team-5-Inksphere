import axios from 'axios';

// The backend issues an httpOnly cookie on login/register, so every
// request needs to carry credentials for the session to work.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

// Normalizes backend error shapes into a single readable string.
// The API sometimes returns { message: "text" } and sometimes
// { message: [ { msg: "text" }, ... ] } from express-validator.
export function extractErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  const data = error?.response?.data;
  if (!data) return error?.message || fallback;
  if (typeof data.message === 'string') return data.message;
  if (Array.isArray(data.message)) {
    return data.message.map((e) => e.msg || e.message).filter(Boolean).join(', ') || fallback;
  }
  return fallback;
}

export default api;
