import './styles.css';
import locImg from '../../assets/loc.png';
import { FaLocationDot } from 'react-icons/fa6';

export default function Location() {
  return (
    <section id='location' className="location-section">
      <h2 className="location-title">
        Nossa localização
      </h2>
      <p className="location-text">
        R. Faustino Teixeira, 57 - Centro, Bom Despacho - MG, 35630-040
      </p>
      <a href="https://www.google.com/maps/place/WA+Contabilidade+e+Solu%C3%A7%C3%B5es+Empresariais/@-19.7367758,-45.2532468,19.04z/data=!4m6!3m5!1s0x94b340854e46707f:0xadb7b974d6412d3c!8m2!3d-19.7367234!4d-45.2531244!16s%2Fg%2F11cm_cngcr?entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D" className='location-link-img'>
        <img src={locImg} alt="Localização da WA Contabilidade" className='location-img' />
      </a>
      <a href="https://www.google.com/maps/place/WA+Contabilidade+e+Solu%C3%A7%C3%B5es+Empresariais/@-19.7367758,-45.2532468,19.04z/data=!4m6!3m5!1s0x94b340854e46707f:0xadb7b974d6412d3c!8m2!3d-19.7367234!4d-45.2531244!16s%2Fg%2F11cm_cngcr?entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D" className="location-link">
        <FaLocationDot className='location-icon' />
        <p>
          Ver localização
        </p>
      </a>
    </section>
  );
}
