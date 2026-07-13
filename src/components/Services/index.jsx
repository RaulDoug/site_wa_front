import './styles.css';
import { servicesList, consultanciesList } from './servicesData';
import { useNavigate } from 'react-router-dom';



export default function Services() {
  const navigate = useNavigate();

  return (
    <section className="services-section">
      <div className="list-container">
        <h3 className="list-title">Serviços</h3>
        <ul className='list'>
          {servicesList.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id} className='list-item' onClick={() => navigate('/servicos')}>
                <Icon className='list-icon' />
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="list-container">
        <h3 className="list-title">Consultorias</h3>
        <ul className='list'>
          {consultanciesList.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id} className='list-item' onClick={() => navigate('/servicos')}>
                <Icon className='list-icon' />
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
