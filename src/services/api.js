import axios from 'axios';

// Instância com as configurações bases
const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// Interceptador para injetar o token JWT automaticamente
api.interceptors.request.use((config) => {
  // Busca o token no localStorage do navegador
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  // Tratar erros da requisição antes de ser enviada
  return Promise.reject(error);
}
);

export default api;
