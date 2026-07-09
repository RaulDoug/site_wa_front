import './styles.css';
import { FaWhatsapp } from 'react-icons/fa';


export default function WhatsappBtn({ className = '' }) {
  return (
    <a href='www.whatsapp.com' className={`whastapp-container ${className}`}>
      <FaWhatsapp className="whatsapp-icon" />
      <p>Fale conosco</p>
    </a>
  );
}
