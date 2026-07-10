import './styles.css';
import logo from '../../assets/logoMobile.png';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaLinkedinIn } from 'react-icons/fa';


export default function Footer() {
  return (
    <footer>
      <section className='footer-main-section'>
        <div className="footer-img-container">
          <img src={logo} alt="Logo WA Contabilidade" />
        </div>
        <div className="footer-nav">
          <div className="footer-nav-list-container map">
            <h3>Mapa do site</h3>
            <ul className="footer-nav-list">
              <li className="nav-item-list">
                <a href="#posts">
                  Postagens
                </a>
              </li>
              <li className="nav-item-list">
                <a href="#events">
                  Eventos
                </a>
              </li>
              <li className="nav-item-list">
                <Link to="/sobre">
                  Sobre nós
                </Link>
              </li>
              <li className="nav-item-list">
                <a href="#testimonials">
                  Depoimentos
                </a>
              </li>
              <li className="nav-item-list">
                <a href="#location">
                  Localização
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-nav-list-container services">
            <h3>Serviços</h3>
            <ul className="footer-nav-list">
              <li className="nav-item-list">
                <Link to='/servicos'>
                  Escrituração Fiscal
                </Link>
              </li>
              <li className="nav-item-list">
                <Link to='/servicos'>
                  Departamento Pessoal
                </Link>
              </li>
              <li className="nav-item-list">
                <Link to='/servicos'>
                  Legalização de Empresas
                </Link>
              </li>
              <li className="nav-item-list">
                <Link to='/servicos'>
                  Obrigações Acessórias
                </Link>
              </li>
              <li className="nav-item-list">
                <Link to='/servicos'>
                  Regularização Fiscal
                </Link>
              </li>
              <li className="nav-item-list">
                <Link to='/servicos'>
                  Distribuição de Lucros
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-nav-list-container consult">
            <h3>Consultorias</h3>
            <ul className="footer-nav-list">
              <li className="nav-item-list">
                <Link to='/servicos'>
                  Planejamento Tributário
                </Link>
              </li>
              <li className="nav-item-list">
                <Link to='/servicos'>
                  BPO Financeiro
                </Link>
              </li>
              <li className="nav-item-list">
                <Link to='/servicos'>
                  Evolução de MPEs
                </Link>
              </li>
              <li className="nav-item-list">
                <Link to='/servicos'>
                  Viabilidade Econômica
                </Link>
              </li>
              <li className="nav-item-list">
                <Link to='/servicos'>
                  Controladoria e Custos
                </Link>
              </li>
              <li className="nav-item-list">
                <Link to='/servicos'>
                  Proteção Patrimonial
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-socials">
          <h3 className='socials-title'>Nossas redes</h3>
          <div className="social-container">
            <a href='www.whatsapp.com' className="social-icon-container">
              <FaWhatsapp className='social-icon' />
            </a>
            <a href='https://www.instagram.com/wapluscontabilidade_oficial/' className="social-icon-container">
              <FaInstagram className='social-icon' />
            </a>
            <a href='www.linkedin.com' className="social-icon-container">
              <FaLinkedinIn className='social-icon' />
            </a>
          </div>
        </div>
      </section>
      <div className="footer-copy">
        © Todos os direitos reservados a WA Contabilidade
      </div>
    </footer>
  );
}
