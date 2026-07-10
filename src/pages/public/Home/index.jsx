import Hero from '../../../components/Hero';
import Header from '../../../components/Header';
import Events from '../../../components/Events';
import Posts from '../../../components/Posts';
import Services from '../../../components/Services';
import About from '../../../components/About';
import Cta from '../../../components/Cta';
import './styles.css';
import Testionials from '../../../components/Testimonials';
import Location from '../../../components/Location';
import Footer from '../../../components/Footer';

export default function Home() {
  return (
    <div className='home'>
      <Header />
      <Hero />
      <Posts />
      <Events limit={6} />
      <Services />
      <About />
      <Cta
        title='Fale com nossos especialistas'
        desc='Soluções contábeis inteligentes para empresas que querem crescer.'
        className='cta-middle-home'
      />
      <Testionials />
      <Location />
      <Footer />
    </div>
  );
}
