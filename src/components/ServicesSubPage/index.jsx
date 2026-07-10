import './styles.css';
import { servicesList, consultanciesList } from '../Services/servicesData';
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function ServicesSubPage() {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'services', 'consultancies'

  const filteredItems = [
    ...(activeTab === 'all' || activeTab === 'services'
      ? servicesList.map(item => ({ ...item, type: 'Serviço' }))
      : []),
    ...(activeTab === 'all' || activeTab === 'consultancies'
      ? consultanciesList.map(item => ({ ...item, type: 'Consultoria' }))
      : [])
  ];

  const handleWhatsAppContact = (title) => {
    const message = encodeURIComponent(`Olá, gostaria de saber mais informações sobre o serviço de: ${title}`);
    window.open(`https://wa.me/55XXXXXXXXXXX?text=${message}`, '_blank');
  };

  return (
    <section className="services-sub-section">
      <div className="services-sub-filter-tabs">
        <button
          className={`filter-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          Todos
        </button>
        <button
          className={`filter-tab-btn ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          Serviços Contábeis
        </button>
        <button
          className={`filter-tab-btn ${activeTab === 'consultancies' ? 'active' : ''}`}
          onClick={() => setActiveTab('consultancies')}
        >
          Consultorias Estratégicas
        </button>
      </div>

      <div className="services-sub-grid">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={`${item.type}-${item.id}`} className="service-sub-card">
              <span className={`service-sub-badge ${item.type === 'Serviço' ? 'badge-service' : 'badge-consultancy'}`}>
                {item.type}
              </span>
              <div className="service-sub-icon-wrapper">
                <Icon className="service-sub-icon" />
              </div>
              <h3 className="service-sub-card-title">{item.title}</h3>
              <p className="service-sub-card-desc">{item.description}</p>
              <button
                className="service-sub-card-cta"
                onClick={() => handleWhatsAppContact(item.title)}
              >
                <span>Solicitar Proposta</span>
                <FaWhatsapp className="whatsapp-icon" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
