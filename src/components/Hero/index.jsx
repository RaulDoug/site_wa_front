import './styles.css';
import heroImg from '../../assets/hero.png';
import WhatsappBtn from '../WhatsappBtn';

export default function Hero() {
  return (
    <div className="hero">
      <img src={heroImg} alt="Foto do escritório WA" />
      <div className="hero-content">
        <h2 className="hero-title">
          Contabilidade inteligente para o futuro dos seus negócios
        </h2>
        <p className="hero-subtitle">
          Simplifique sua gestão financeira com a WA Plus.
          {<br />}
          Soluções personalizadas para empresas inovadoras.
        </p>
        <WhatsappBtn className='hero-whats-btn' />
      </div>
    </div>
  );
}
