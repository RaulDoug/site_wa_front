import { Routes, Route } from 'react-router-dom';
import Home from '../pages/public/Home';
import Login from '../pages/admin/Login';
import AdminDash from '../pages/admin/AdminDash';
import ProtectedRoute from './ProtectedRoute.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />

      {/* Rotas protegidas (ADM) */}
      <Route element={<ProtectedRoute />}>
        <Route path='/warotaadm' element={<AdminDash />} />
      </Route>

      {/* Rota 404 (Não encontrada) */}
      <Route path='*' element={<h2>Página não encontrada (404)</h2>} />
    </Routes>
  );
}
