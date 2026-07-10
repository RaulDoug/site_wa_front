import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import Cta from '../../../components/Cta';
import aboutImg from '../../../assets/hero.png';
import './styles.css';
import { FaHandshake, FaLightbulb, FaChartBar, FaHeart } from 'react-icons/fa';

export default function AboutPage() {
  const values = [
    {
      icon: FaHandshake,
      title: 'Ética e Transparência',
      desc: 'Atuar sempre em conformidade legal com clareza absoluta em todas as nossas operações e parcerias.'
    },
    {
      icon: FaLightbulb,
      title: 'Inovação e Tecnologia',
      desc: 'Utilizar as melhores ferramentas digitais para trazer velocidade, segurança e insights aos negócios.'
    },
    {
      icon: FaChartBar,
      title: 'Foco em Resultados',
      desc: 'Orientar todas as nossas estratégias para gerar economia real de impostos e crescimento sustentável.'
    },
    {
      icon: FaHeart,
      title: 'Atendimento Humanizado',
      desc: 'Construir conexões reais e próximas com cada parceiro, entendendo suas dores e objetivos específicos.'
    }
  ];

  return (
    <div className="about-subpage">
      <Header />

      <div className="about-title-container">
        <h2 className="about-title-sub">Sobre Nós</h2>
        <p className="about-title-desc">Conheça nossa trajetória, nossa missão e o que nos move todos os dias.</p>
      </div>

      <section className="about-subpage-content">
        <div className="about-intro-grid">
          <div className="about-intro-text">
            <span className="about-subtitle">Quem Somos</span>
            <h3 className="about-intro-heading">A parceria estratégica que a sua empresa precisa para crescer</h3>
            <p>
              A WA Contabilidade nasceu com o propósito de redefinir a relação entre empresas e contabilidade. Acreditamos que a gestão contábil não deve ser apenas burocrática, mas sim um pilar de inteligência estratégica para apoiar tomadas de decisões seguras.
            </p>
            <p>
              Unimos profunda expertise em gestão tributária a tecnologias de ponta para automatizar rotinas, blindar o patrimônio dos nossos clientes e encontrar as rotas legais mais eficientes para a economia de impostos. Atuamos com destaque em diversos segmentos, oferecendo soluções personalizadas para o tamanho do seu negócio.
            </p>
          </div>
          <div className="about-intro-img">
            <img src={aboutImg} alt="Escritório WA Contabilidade" />
          </div>
        </div>

        <div className="about-mission-vision">
          <div className="mission-card">
            <h4>Nossa Missão</h4>
            <p>
              Proporcionar soluções contábeis e estratégicas inovadoras que viabilizem o crescimento sustentável e seguro dos nossos parceiros, focando sempre na redução de riscos e na otimização tributária.
            </p>
          </div>
          <div className="vision-card">
            <h4>Nossa Visão</h4>
            <p>
              Ser referência em contabilidade digital e consultoria estratégica, reconhecidos pela excelência técnica, proximidade humana e impacto real na rentabilidade dos nossos clientes.
            </p>
          </div>
        </div>

        <div className="about-values-section">
          <h3 className="values-title">Nossos Valores</h3>
          <div className="values-grid">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="value-card">
                  <div className="value-icon-wrapper">
                    <Icon className="value-icon" />
                  </div>
                  <h5>{val.title}</h5>
                  <p>{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Cta
        title="Fale com nossos especialistas"
        desc="Soluções contábeis inteligentes para empresas que querem crescer."
        className="cta-blog"
      />

      <Footer />
    </div>
  );
}
