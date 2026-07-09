import WhatsappBtn from '../WhatsappBtn';
import './styles.css';
import img from '../../assets/hero.png';

export default function Cta({ title, desc, className = '' }) {
  return (
    <div className='cta-background'>
      <section className={`cta-section ${className}`}>
        <img src={img} alt="Imagem contabilidade" />
        <div className="cta-info">
          <h2 className="cta-title">
            {title}
          </h2>
          <p className="cta-desc">
            {desc}
          </p>
          <WhatsappBtn className='whats-btn-cta' />
        </div>
      </section>
    </div>
  );
}
