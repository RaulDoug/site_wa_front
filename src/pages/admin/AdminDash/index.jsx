import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiLogOut,
  FiExternalLink,
  FiCalendar,
  FiFileText,
  FiMapPin,
  FiX,
  FiUser,
  FiType
} from 'react-icons/fi';
import api from '../../../services/api';
import './styles.css';

export default function AdminDash() {
  const navigate = useNavigate();

  // Tab State: 'posts' or 'events'
  const [activeTab, setActiveTab] = useState('posts');

  // Data States
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Search & Filter States
  const [postSearch, setPostSearch] = useState('');
  const [postSort, setPostSort] = useState('newest'); // newest, oldest, title
  const [eventSearch, setEventSearch] = useState('');
  const [eventSort, setEventSort] = useState('upcoming'); // upcoming, past, title

  // Modal Control States
  const [showFormModal, setShowFormModal] = useState(false);
  const [formType, setFormType] = useState('post'); // 'post' or 'event'
  const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'
  const [selectedId, setSelectedId] = useState(null);

  // Form Fields State - Post
  const [postForm, setPostForm] = useState({
    title: '',
    subtitle: '',
    author: '',
    imageUrl: '',
    content: ''
  });

  // Form Fields State - Event
  const [eventForm, setEventForm] = useState({
    title: '',
    desc: '',
    imageUrl: '',
    eventLoc: '',
    eventDate: ''
  });

  // Delete Confirmation State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, type, name }

  // Load Data
  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [postsRes, eventsRes] = await Promise.all([
        api.get('/posts'),
        api.get('/events')
      ]);
      setPosts(postsRes.data);
      setEvents(eventsRes.data);
    } catch (err) {
      console.error(err);
      setError(`Erro ao carregar dados: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const init = async () => {
      try {
        const [postsRes, eventsRes] = await Promise.all([
          api.get('/posts'),
          api.get('/events')
        ]);
        if (!active) return;
        setPosts(postsRes.data);
        setEvents(eventsRes.data);
      } catch (err) {
        console.error(err);
        if (!active) return;
        setError(`Erro ao carregar dados: ${err.response?.data?.message || err.message}`);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    init();

    return () => {
      active = false;
    };
  }, []);

  // Handle LogOut
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Toast / Temporary messages helper
  const showToast = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  // --- CRUD POSTS ---
  const handleOpenCreatePost = () => {
    setFormType('post');
    setFormMode('create');
    setPostForm({ title: '', subtitle: '', author: '', imageUrl: '', content: '' });
    setSelectedId(null);
    setShowFormModal(true);
  };

  const handleOpenEditPost = (post) => {
    setFormType('post');
    setFormMode('edit');
    setPostForm({
      title: post.title,
      subtitle: post.subtitle || '',
      author: post.author,
      imageUrl: post.imageUrl || '',
      content: post.content
    });
    setSelectedId(post._id);
    setShowFormModal(true);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (formMode === 'create') {
        const response = await api.post('/posts', postForm);
        showToast(response.data.message || 'Post criado com sucesso!');
      } else {
        const response = await api.put(`/posts/${selectedId}`, postForm);
        showToast(response.data.message || 'Post atualizado com sucesso!');
      }
      setShowFormModal(false);
      loadData();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Erro ao salvar a postagem. Verifique os campos.');
    }
  };

  // --- CRUD EVENTS ---
  const handleOpenCreateEvent = () => {
    setFormType('event');
    setFormMode('create');
    setEventForm({ title: '', desc: '', imageUrl: '', eventLoc: '', eventDate: '' });
    setSelectedId(null);
    setShowFormModal(true);
  };

  const handleOpenEditEvent = (event) => {
    setFormType('event');
    setFormMode('edit');
    // Format date string to YYYY-MM-DD for input type="date"
    const formattedDate = event.eventDate ? new Date(event.eventDate).toISOString().substring(0, 10) : '';
    setEventForm({
      title: event.title,
      desc: event.desc,
      imageUrl: event.imageUrl || '',
      eventLoc: event.eventLoc,
      eventDate: formattedDate
    });
    setSelectedId(event._id);
    setShowFormModal(true);
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (formMode === 'create') {
        const response = await api.post('/events', eventForm);
        showToast(response.data.message || 'Evento criado com sucesso!');
      } else {
        const response = await api.put(`/events/${selectedId}`, eventForm);
        showToast(response.data.message || 'Evento atualizado com sucesso!');
      }
      setShowFormModal(false);
      loadData();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Erro ao salvar o evento. Verifique os campos.');
    }
  };

  // --- DELETE CONFIRMATION ---
  const triggerDeleteConfirm = (id, type, name) => {
    setDeleteTarget({ id, type, name });
    setShowDeleteModal(true);
  };

  const handleDeleteExecute = async () => {
    if (!deleteTarget) return;
    setError('');
    try {
      const { id, type } = deleteTarget;
      const endpoint = type === 'post' ? `/posts/${id}` : `/events/${id}`;
      const response = await api.delete(endpoint);
      showToast(response.data.message || 'Item removido com sucesso!');
      setShowDeleteModal(false);
      setDeleteTarget(null);
      loadData();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Erro ao excluir o item do servidor.');
      setShowDeleteModal(false);
    }
  };

  // --- SEARCH AND FILTER LÒGIC (useMemo) ---
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Search
    if (postSearch.trim() !== '') {
      const term = postSearch.toLowerCase();
      result = result.filter(
        post =>
          post.title?.toLowerCase().includes(term) ||
          post.subtitle?.toLowerCase().includes(term) ||
          post.author?.toLowerCase().includes(term) ||
          post.content?.toLowerCase().includes(term)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (postSort === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (postSort === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (postSort === 'title') {
        return a.title?.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [posts, postSearch, postSort]);

  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Search
    if (eventSearch.trim() !== '') {
      const term = eventSearch.toLowerCase();
      result = result.filter(
        event =>
          event.title?.toLowerCase().includes(term) ||
          event.desc?.toLowerCase().includes(term) ||
          event.eventLoc?.toLowerCase().includes(term)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (eventSort === 'upcoming') {
        // Eventos mais futuros primeiro
        return new Date(a.eventDate) - new Date(b.eventDate);
      }
      if (eventSort === 'past') {
        // Eventos mais passados primeiro
        return new Date(b.eventDate) - new Date(a.eventDate);
      }
      if (eventSort === 'title') {
        return a.title?.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [events, eventSearch, eventSort]);

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar de Controle */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <h2>WA <span>Contábil</span></h2>
          <p>Painel Administrativo</p>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            <FiFileText size={18} />
            <span>Postagens</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <FiCalendar size={18} />
            <span>Agenda & Eventos</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="btn-visit-site">
            <FiExternalLink size={16} />
            <span>Voltar ao Site</span>
          </Link>
          <button onClick={handleLogout} className="btn-logout">
            <FiLogOut size={16} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="admin-main-content">
        <div className="admin-content-header">
          <div className="header-title">
            <h1>{activeTab === 'posts' ? 'Gerenciar Postagens' : 'Gerenciar Agenda & Eventos'}</h1>
            <p>
              {activeTab === 'posts'
                ? 'Publique e atualize conteúdos para o Blog.'
                : 'Mantenha o calendário de eventos e agenda atualizados.'}
            </p>
          </div>

          <div className="header-actions">
            {activeTab === 'posts' ? (
              <button onClick={handleOpenCreatePost} className="btn-action-primary">
                <FiPlus size={18} />
                <span>Nova Postagem</span>
              </button>
            ) : (
              <button onClick={handleOpenCreateEvent} className="btn-action-primary">
                <FiPlus size={18} />
                <span>Novo Evento</span>
              </button>
            )}
          </div>
        </div>

        {/* Notificações / Status */}
        {error && (
          <div className="status-message status-error">
            <p>{error}</p>
            <button onClick={() => setError('')} className="btn-close-message"><FiX /></button>
          </div>
        )}
        {successMessage && (
          <div className="status-message status-success">
            <p>{successMessage}</p>
          </div>
        )}

        {/* Filtros e Barra de Pesquisa */}
        <section className="search-filter-section">
          <div className="search-box">
            <FiSearch className="search-icon" size={18} />
            {activeTab === 'posts' ? (
              <input
                type="text"
                placeholder="Pesquisar posts por título, autor, conteúdo..."
                value={postSearch}
                onChange={(e) => setPostSearch(e.target.value)}
              />
            ) : (
              <input
                type="text"
                placeholder="Pesquisar eventos por título, local ou descrição..."
                value={eventSearch}
                onChange={(e) => setEventSearch(e.target.value)}
              />
            )}
            {(activeTab === 'posts' ? postSearch : eventSearch) && (
              <button
                onClick={() => activeTab === 'posts' ? setPostSearch('') : setEventSearch('')}
                className="btn-clear-search"
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          <div className="filter-box">
            <label>Ordenar por:</label>
            {activeTab === 'posts' ? (
              <select value={postSort} onChange={(e) => setPostSort(e.target.value)}>
                <option value="newest">Mais Recentes</option>
                <option value="oldest">Mais Antigos</option>
                <option value="title">Ordem Alfabética</option>
              </select>
            ) : (
              <select value={eventSort} onChange={(e) => setEventSort(e.target.value)}>
                <option value="upcoming">Mais Próximos</option>
                <option value="past">Passados</option>
                <option value="title">Ordem Alfabética</option>
              </select>
            )}
          </div>
        </section>

        {/* Painel do Conteúdo Principal */}
        {loading ? (
          <div className="admin-loading-spinner">
            <div className="spinner"></div>
            <p>Carregando dados...</p>
          </div>
        ) : (
          <section className="dashboard-grid-content">
            {activeTab === 'posts' ? (
              filteredPosts.length === 0 ? (
                <div className="empty-state">
                  <FiFileText size={48} />
                  <p>Nenhuma postagem encontrada.</p>
                </div>
              ) : (
                <div className="admin-cards-grid">
                  {filteredPosts.map((post) => (
                    <article key={post._id} className="admin-data-card">
                      {post.imageUrl && (
                        <div className="card-image-preview">
                          <img src={post.imageUrl} alt={post.title} onError={(e) => e.target.style.display = 'none'} />
                        </div>
                      )}
                      <div className="card-body">
                        <span className="card-meta-author"><FiUser size={12} /> {post.author}</span>
                        <h3 className="card-title">{post.title}</h3>
                        {post.subtitle && <h4 className="card-subtitle">{post.subtitle}</h4>}
                        <p className="card-excerpt">{post.content ? post.content.substring(0, 120) + '...' : ''}</p>

                        <div className="card-footer-actions">
                          <button onClick={() => handleOpenEditPost(post)} className="btn-icon-action btn-edit" title="Editar">
                            <FiEdit2 size={14} />
                            <span>Editar</span>
                          </button>
                          <button
                            onClick={() => triggerDeleteConfirm(post._id, 'post', post.title)}
                            className="btn-icon-action btn-delete"
                            title="Excluir"
                          >
                            <FiTrash2 size={14} />
                            <span>Excluir</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )
            ) : (
              filteredEvents.length === 0 ? (
                <div className="empty-state">
                  <FiCalendar size={48} />
                  <p>Nenhum evento agendado encontrado.</p>
                </div>
              ) : (
                <div className="admin-cards-grid">
                  {filteredEvents.map((event) => {
                    const dateObj = new Date(event.eventDate);
                    const formattedDateStr = dateObj.toLocaleDateString('pt-br', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    });

                    return (
                      <article key={event._id} className="admin-data-card">
                        {event.imageUrl && (
                          <div className="card-image-preview">
                            <img src={event.imageUrl} alt={event.title} onError={(e) => e.target.style.display = 'none'} />
                          </div>
                        )}
                        <div className="card-body">
                          <div className="card-meta-row">
                            <span className="card-meta-date"><FiCalendar size={12} /> {formattedDateStr}</span>
                            <span className="card-meta-location"><FiMapPin size={12} /> {event.eventLoc}</span>
                          </div>
                          <h3 className="card-title">{event.title}</h3>
                          <p className="card-excerpt">{event.desc ? event.desc.substring(0, 120) + '...' : ''}</p>

                          <div className="card-footer-actions">
                            <button onClick={() => handleOpenEditEvent(event)} className="btn-icon-action btn-edit" title="Editar">
                              <FiEdit2 size={14} />
                              <span>Editar</span>
                            </button>
                            <button
                              onClick={() => triggerDeleteConfirm(event._id, 'event', event.title)}
                              className="btn-icon-action btn-delete"
                              title="Excluir"
                            >
                              <FiTrash2 size={14} />
                              <span>Excluir</span>
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )
            )}
          </section>
        )}
      </main>

      {/* MODAL DE FORMULÁRIO (Criação/Edição) */}
      {showFormModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h2>
                {formMode === 'create' ? 'Adicionar' : 'Editar'}{' '}
                {formType === 'post' ? 'Postagem' : 'Evento'}
              </h2>
              <button onClick={() => setShowFormModal(false)} className="btn-close-modal">
                <FiX size={20} />
              </button>
            </div>

            {formType === 'post' ? (
              <form onSubmit={handlePostSubmit} className="modal-form">
                <div className="form-group">
                  <label htmlFor="post-title">Título <span className="req">*</span></label>
                  <div className="input-with-icon">
                    <FiType className="input-icon" />
                    <input
                      id="post-title"
                      type="text"
                      placeholder="Mínimo de 3 caracteres"
                      value={postForm.title}
                      onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="post-subtitle">Subtítulo</label>
                  <input
                    id="post-subtitle"
                    type="text"
                    placeholder="Subtítulo opcional"
                    value={postForm.subtitle}
                    onChange={(e) => setPostForm({ ...postForm, subtitle: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="post-author">Autor <span className="req">*</span></label>
                  <div className="input-with-icon">
                    <FiUser className="input-icon" />
                    <input
                      id="post-author"
                      type="text"
                      placeholder="Nome do autor"
                      value={postForm.author}
                      onChange={(e) => setPostForm({ ...postForm, author: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="post-image">URL da Imagem</label>
                  <input
                    id="post-image"
                    type="url"
                    placeholder="https://exemplo.com/imagem.jpg"
                    value={postForm.imageUrl}
                    onChange={(e) => setPostForm({ ...postForm, imageUrl: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="post-content">Conteúdo <span className="req">*</span></label>
                  <textarea
                    id="post-content"
                    rows={6}
                    placeholder="Escreva o conteúdo completo aqui (Mínimo de 10 caracteres)"
                    value={postForm.content}
                    onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                    required
                  ></textarea>
                </div>

                <footer className="modal-footer">
                  <button type="button" onClick={() => setShowFormModal(false)} className="btn-secondary">
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary">
                    {formMode === 'create' ? 'Salvar Post' : 'Salvar Alterações'}
                  </button>
                </footer>
              </form>
            ) : (
              <form onSubmit={handleEventSubmit} className="modal-form">
                <div className="form-group">
                  <label htmlFor="event-title">Título do Evento <span className="req">*</span></label>
                  <div className="input-with-icon">
                    <FiType className="input-icon" />
                    <input
                      id="event-title"
                      type="text"
                      placeholder="Mínimo de 3 caracteres"
                      value={eventForm.title}
                      onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="event-date">Data do Evento <span className="req">*</span></label>
                    <input
                      id="event-date"
                      type="date"
                      value={eventForm.eventDate}
                      onChange={(e) => setEventForm({ ...eventForm, eventDate: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="event-location">Localização <span className="req">*</span></label>
                    <div className="input-with-icon">
                      <FiMapPin className="input-icon" />
                      <input
                        id="event-location"
                        type="text"
                        placeholder="Ex: São Paulo, SP ou Online"
                        value={eventForm.eventLoc}
                        onChange={(e) => setEventForm({ ...eventForm, eventLoc: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="event-image">URL da Imagem</label>
                  <input
                    id="event-image"
                    type="url"
                    placeholder="https://exemplo.com/evento.jpg"
                    value={eventForm.imageUrl}
                    onChange={(e) => setEventForm({ ...eventForm, imageUrl: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="event-desc">Descrição <span className="req">*</span></label>
                  <textarea
                    id="event-desc"
                    rows={6}
                    placeholder="Descrição detalhada do evento (Mínimo de 5 caracteres)"
                    value={eventForm.desc}
                    onChange={(e) => setEventForm({ ...eventForm, desc: e.target.value })}
                    required
                  ></textarea>
                </div>

                <footer className="modal-footer">
                  <button type="button" onClick={() => setShowFormModal(false)} className="btn-secondary">
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary">
                    {formMode === 'create' ? 'Criar Evento' : 'Salvar Alterações'}
                  </button>
                </footer>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
      {showDeleteModal && deleteTarget && (
        <div className="modal-overlay">
          <div className="modal-card modal-confirm">
            <div className="modal-header">
              <h2>Confirmar Exclusão</h2>
              <button onClick={() => setShowDeleteModal(false)} className="btn-close-modal">
                <FiX size={20} />
              </button>
            </div>

            <div className="confirm-body">
              <p>Tem certeza absoluta que deseja remover o seguinte item?</p>
              <div className="confirm-item-preview">
                <strong>{deleteTarget.type === 'post' ? 'Postagem:' : 'Evento:'}</strong>
                <span>{deleteTarget.name}</span>
              </div>
              <p className="danger-warning">Esta ação é permanente e não poderá ser desfeita.</p>
            </div>

            <footer className="modal-footer">
              <button onClick={() => setShowDeleteModal(false)} className="btn-secondary">
                Cancelar
              </button>
              <button onClick={handleDeleteExecute} className="btn-danger">
                Confirmar e Excluir
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

