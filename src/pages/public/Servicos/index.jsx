import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import ServicesSubPage from '../../../components/ServicesSubPage';
import Cta from '../../../components/Cta';
import './styles.css';

export default function Servicos() {
  return (
    <div className="service-subpage">
      <Header />
      <div className="service-title-container">
        <h2 className="service-title">
          Nossos Serviços e Consultorias
        </h2>
        <p className="service-title-desc">
          Soluções contábeis e estratégicas personalizadas para impulsionar o seu negócio.
        </p>
      </div>
      <ServicesSubPage />
      <Cta
        title='Fale com nossos especialistas'
        desc='Soluções contábeis inteligentes para empresas que querem crescer.'
        className='cta-blog'
      />
      <Footer />
    </div>
  );
}
