import api from './axios';

export const createBlog = (payload) => {
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('content', payload.content);
  formData.append('category', payload.category);
  if (payload.coverImage) formData.append('coverImage', payload.coverImage);
  return api.post('/blog/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getAllBlogs = () => api.get('/blog/blogs');

export const getLatestBlogs = () => api.get('/blog/blog/latestblog');

export const getTrendingBlogs = () => api.get('/blog/blogs/trendingblogs');

export const getBlogById = (id) => api.get(`/blog/blog/${id}`);

export const getBlogsByProfile = (userId) => api.get(`/blog/blogsonprofile/${userId}`);

export const getBlogsByCategory = (category) => api.get(`/blog/blog/category/${category}`);

export const updateBlog = (id, payload) => api.put(`/blog/updateblog/${id}`, payload);

export const deleteBlog = (id) => api.delete(`/blog/blogdelete/${id}`);

export const likeBlog = (blogId) => api.post(`/blog/blog/like/${blogId}`);

export const getBlogLikes = (blogId) => api.get(`/blog/blog/bloglike/${blogId}`);

export const createComment = (blogId, content) => api.post(`/blog/blog/comment/${blogId}`, { content });

export const getComments = (blogId) => api.get(`/blog/blog/allcomment/${blogId}`);

export const deleteComment = (commentId) => api.delete(`/blog/blog/comment/dlt/${commentId}`);

export const toggleBookmark = (blogId) => api.put(`/blog/blog/bookmark/${blogId}`);

export const getBookmarks = () => api.get('/blog/blog/allbookmark/me');

export const searchBlogs = (query) => api.get('/blog/blog/search/search', { params: { query } });
