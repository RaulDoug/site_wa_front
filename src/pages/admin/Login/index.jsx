import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api.js';
import './styles.css';

export default function Login() {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', { name, pass });

      const { token } = response.data;

      localStorage.setItem('token', token);

      navigate('/warotaadm');
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao ralizar login';
      setError(message);
      console.log(error);
    }
  };

  return (
    <div className='form-login-container'>
      <form onSubmit={handleLogin} className='form-login'>
        <div className="form-login-input">
          <label>Usuário</label>
          <input type="text" value={name} onChange={
            (e) => setName(e.target.value)} required
          />
        </div>
        <div className="form-login-input">
          <label>Senha</label>
          <input type="password" value={pass} onChange={
            (e) => setPass(e.target.value)} required
          />
        </div>
        <div className="form-error">
          {error && <p>{error}</p>}
        </div>
        <button type='submit' className="form-btn">Entrar</button>
      </form>
    </div>
  );
}
