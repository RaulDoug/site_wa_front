import './styles.css';
import img from '../../assets/hero.png';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <section id='about' className="about-section">
      <h2 className="about-title">
        Sobre nós
      </h2>
      <div className="about-info-container">
        <div className="about-img-container">
          <img src={img} alt="Escritório da contabilidade" />
        </div>
        <div className="about-info-text">
          <h3 className="about-info-title">
            Transformando a contabilidade em estratégia para o seu negócio
          </h3>
          <p className="about-info-desc">
            Na WA Contabilidade, unimos tecnologia, gestão tributária inteligente e um atendimento próximo para ajudar empresas a crescerem com segurança e redução de carga tributária. Com expertise consolidada no setor farmacêutico e em diversos outros segmentos, nossa missão é ser o braço estratégico que viabiliza o seu sucesso, garantindo eficiência financeira e decisões mais seguras para sua empresa.
          </p>
          <Link to='/sobre' className='view-more-btn view-more-about'>
            Ver mais
          </Link>
        </div>
      </div>
    </section>
  );
}
