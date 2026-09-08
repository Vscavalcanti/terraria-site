import { CATEGORIES } from '../data/categories';

export type PageKey = 'home' | 'timeline' | 'dashboard' | 'biomas' | string;

export function Nav({ page, onNavigate }: { page: PageKey; onNavigate: (p: PageKey) => void }) {
  return (
    <nav className="rail">
      <div className="rail-brand">
        Terraria Bug Archive
        <small>arquivo histórico de bugs</small>
      </div>

      <button className={`rail-link ${page === 'home' ? 'active' : ''}`} onClick={() => onNavigate('home')}>
        <span className="icon">🏠</span> Início
      </button>

      <div className="rail-section-label">CATEGORIAS</div>
      {CATEGORIES.map((c) => (
        <button key={c.key} className={`rail-link ${page === c.key ? 'active' : ''}`} onClick={() => onNavigate(c.key)}>
          <span className="icon">{c.icon}</span> {c.label}
        </button>
      ))}

      <div className="rail-section-label">ANÁLISE</div>
      <button className={`rail-link ${page === 'timeline' ? 'active' : ''}`} onClick={() => onNavigate('timeline')}>
        <span className="icon">🕰️</span> Linha do Tempo
      </button>
      <button className={`rail-link ${page === 'dashboard' ? 'active' : ''}`} onClick={() => onNavigate('dashboard')}>
        <span className="icon">📊</span> Dashboard
      </button>
    </nav>
  );
}
