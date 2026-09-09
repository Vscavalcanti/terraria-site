import { CATEGORIES } from '../data/categories';
import { useTheme } from '../hooks/useTheme';

export type PageKey = 'home' | 'timeline' | 'dashboard' | 'biomas' | string;

export function Nav({ page, onNavigate }: { page: PageKey; onNavigate: (p: PageKey) => void }) {
  const { theme, toggle } = useTheme();

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="topbar-top-row">
          <button className="topbar-brand" onClick={() => onNavigate('home')}>
            Terraria Bug Archive
            <small>arquivo histórico de bugs</small>
          </button>
          <button
            className="theme-toggle"
            onClick={toggle}
            title={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        <nav className="topbar-nav">
          <button className={`topbar-link ${page === 'home' ? 'active' : ''}`} onClick={() => onNavigate('home')}>
            <span className="icon">🏠</span> Início
          </button>
          <button className={`topbar-link ${page === 'top3' ? 'active' : ''}`} onClick={() => onNavigate('top3')}>
            <span className="icon">🏆</span> Top 3
          </button>
          <span className="topbar-sep" />
          {CATEGORIES.map((c) => (
            <button key={c.key} className={`topbar-link ${page === c.key ? 'active' : ''}`} onClick={() => onNavigate(c.key)}>
              <span className="icon">{c.icon}</span> {c.label}
            </button>
          ))}
          <span className="topbar-sep" />
          <button className={`topbar-link ${page === 'timeline' ? 'active' : ''}`} onClick={() => onNavigate('timeline')}>
            <span className="icon">🕰️</span> Linha do Tempo
          </button>
          <button className={`topbar-link ${page === 'dashboard' ? 'active' : ''}`} onClick={() => onNavigate('dashboard')}>
            <span className="icon">📊</span> Dashboard
          </button>
        </nav>
      </div>
    </header>
  );
}
