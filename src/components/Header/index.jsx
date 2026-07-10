import './styles.css';
import logo from '../../assets/logoMobile.png';
import { FaBars, FaTimes, FaRegUser } from 'react-icons/fa';
import { IoHomeOutline } from 'react-icons/io5';
import { MdOutlineEventAvailable, MdOutlineWorkOutline, MdOutlineAdminPanelSettings } from 'react-icons/md';
import { FaRegNewspaper } from 'react-icons/fa6';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import WhatsappBtn from '../WhatsappBtn';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <header>
        <Link to='/' className="header-logo">
          <img src={logo} alt="Logo WA Contabilidade" />
        </Link>
        <nav className="header-links">
          <NavLink to='/' className='header-nav-link'>Início</NavLink>
          <NavLink to='/blog' className='header-nav-link'>Blog</NavLink>
          <NavLink to='/agenda' className='header-nav-link'>Agenda</NavLink>
          <NavLink to='/servicos' className='header-nav-link'>Serviços</NavLink>
          <NavLink to='/sobre' className='header-nav-link'>Sobre nós</NavLink>
          {isAuthenticated && (
            <NavLink to='/warotaadm' className='header-nav-link'>Painel ADM</NavLink>
          )}
        </nav>
        <button className='header-sidebar-btn' onClick={toggleSidebar}>
          <FaBars className='sidebar-btn-icon' />
        </button>
        <WhatsappBtn className="whats-btn-header" />
      </header>

      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar} />

      <aside className={`sidebar-container ${isOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Logo WA Contabilidade" />
          <button className='sidebar-close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>
        <nav className="sidebar-links">
          <NavLink to='/' onClick={toggleSidebar} className='navlink-sidebar'>
            <IoHomeOutline className='sidebar-links-icons' />
            <p>Início</p>
          </NavLink>
          <NavLink to='/blog' onClick={toggleSidebar} className='navlink-sidebar'>
            <FaRegNewspaper className='sidebar-links-icons' />
            <p>Blog</p>
          </NavLink>
          <NavLink to='/agenda' onClick={toggleSidebar} className='navlink-sidebar'>
            <MdOutlineEventAvailable className='sidebar-links-icons' />
            <p>Agenda</p>
          </NavLink>
          <NavLink to='/servicos' onClick={toggleSidebar} className='navlink-sidebar'>
            <MdOutlineWorkOutline className='sidebar-links-icons' />
            <p>Serviços</p>
          </NavLink>
          <NavLink to='/sobre' onClick={toggleSidebar} className='navlink-sidebar'>
            <FaRegUser className='sidebar-links-icons' />
            <p>Sobre nós</p>
          </NavLink>
          {isAuthenticated && (
            <NavLink to='/warotaadm' onClick={toggleSidebar} className='navlink-sidebar'>
              <MdOutlineAdminPanelSettings className='sidebar-links-icons' />
              <p>Painel ADM</p>
            </NavLink>
          )}
        </nav>
        <WhatsappBtn />
      </aside>
    </>
  );
}
