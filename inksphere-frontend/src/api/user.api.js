import api from './axios';

// Returns the logged-in user's own profile. Used both to render the
// profile page and to restore a session on app load.
export const getMyProfile = () => api.get('/user/profile');

export const updateMyProfile = (payload) => api.put('/user/updateprofile', payload);

export const uploadProfilePicture = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return api.put('/user/upload-profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getMyProfilePicture = () => api.get('/user/profilepicture');

export const getProfileById = (id) => api.get(`/user/profile/${id}`);
