import Cta from '../../../components/Cta';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import PostsSubPage from '../../../components/PostsSubPage';
import './styles.css';

export default function Blog() {
  return (
    <section className='blog-page'>
      <Header />
      <div className="blog-title-container">
        <h2 className="blog-title">
          Blog & Insights
        </h2>
        <p className="blog-title-desc">
          Fique por dentro das últimas novidades, tendências e conhecimentos da mundo da contabilidade
        </p>
      </div>
      <PostsSubPage />
      <Cta
        title='Fale com nossos especialistas'
        desc='Soluções contábeis inteligentes para empresas que querem crescer.'
        className='cta-blog'
      />
      <Footer />
    </section>
  );
}
