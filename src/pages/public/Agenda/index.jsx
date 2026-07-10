import Cta from '../../../components/Cta';
import EventsSubPage from '../../../components/EventsSubPage';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import './styles.css';


export default function Agenda() {
  return (
    <section className="agenda-subpage">
      <Header />
      <div className="agenda-title-container">
        <h2 className="agenda-title">
          Agenda e Eventos
        </h2>
        <p className="agenda-title-desc">
          Fique por dentro dos nossos eventos e da nossa agenda.
        </p>
      </div>
      <EventsSubPage />
      <Cta
        title='Fale com nossos especialistas'
        desc='Soluções contábeis inteligentes para empresas que querem crescer.'
        className='cta-blog'
      />
      <Footer />
    </section>
  );
}
