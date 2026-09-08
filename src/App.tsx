import { useEffect, useRef, useState } from 'react';
import { Nav } from './components/Nav';
import { Player } from './components/Player';
import { BugDetail } from './components/BugDetail';
import { Home } from './pages/Home';
import { Biomes } from './pages/Biomes';
import { Category } from './pages/Category';
import { Timeline } from './pages/Timeline';
import { Dashboard } from './pages/Dashboard';
import { CATEGORIES, categoryByKey } from './data/categories';
import { biomeByKey } from './data/biomes';
import { bugById } from './data/bugs';
import { AudioManager } from './audio/AudioManager';
import { usePresentationMode } from './hooks/usePresentationMode';

const NAV_ORDER = ['home', 'biomas', ...CATEGORIES.filter((c) => c.key !== 'biomas').map((c) => c.key), 'timeline', 'dashboard'];

export default function App() {
  const [page, setPage] = useState('home');
  const [selectedBiome, setSelectedBiome] = useState<string | null>(null);
  const [openBugId, setOpenBugId] = useState<string | null>(null);
  const lastMusicContext = useRef<string>('');

  const goto = (p: string) => {
    setPage(p);
    if (p !== 'biomas') setSelectedBiome(null);
  };

  const navIndex = NAV_ORDER.indexOf(page);
  const prev = () => goto(NAV_ORDER[(navIndex - 1 + NAV_ORDER.length) % NAV_ORDER.length]);
  const next = () => goto(NAV_ORDER[(navIndex + 1) % NAV_ORDER.length]);
  const presentation = usePresentationMode(prev, next);

  // Troca de música conforme a navegação (biomas trocam para a faixa do bioma;
  // demais categorias usam a playlist aleatória; home/timeline/dashboard silenciam).
  useEffect(() => {
    const musicCategories = new Set<string>(CATEGORIES.map((c) => c.key));
    let context = '';
    if (page === 'biomas' && selectedBiome) {
      const biome = biomeByKey(selectedBiome);
      if (biome) {
        context = `biome:${biome.key}`;
        if (lastMusicContext.current !== context) {
          AudioManager.playBiomeMusic(biome.key, biome.audioFile, `${biome.icon} ${biome.label}`);
        }
      }
    } else if (musicCategories.has(page) && page !== 'biomas') {
      context = `random:${page}`;
      if (lastMusicContext.current !== context) {
        AudioManager.playRandomMusic();
      }
    }
    lastMusicContext.current = context;
  }, [page, selectedBiome]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'p' && (e.metaKey || e.ctrlKey || e.altKey)) {
        e.preventDefault();
        presentation.toggle();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openBug = (id: string) => setOpenBugId(id);
  const closeBug = () => setOpenBugId(null);
  const bug = openBugId ? bugById(openBugId) : null;

  const renderPage = () => {
    if (page === 'home') return <Home onOpenBug={openBug} onNavigate={goto} />;
    if (page === 'biomas') return <Biomes selected={selectedBiome} onSelect={setSelectedBiome} onOpenBug={openBug} />;
    if (page === 'timeline') return <Timeline onOpenBug={openBug} />;
    if (page === 'dashboard') return <Dashboard />;
    const cat = categoryByKey(page);
    if (cat) return <Category category={cat} onOpenBug={openBug} />;
    return <Home onOpenBug={openBug} onNavigate={goto} />;
  };

  return (
    <div className={`app-shell ${presentation.active ? 'presentation' : ''}`}>
      {presentation.active && (
        <div className="presentation-bar">
          <span>🎤 MODO APRESENTAÇÃO — ← anterior · → próximo · ESC sair</span>
          <button onClick={presentation.exit}>Sair</button>
        </div>
      )}
      {!presentation.active && <Nav page={page} onNavigate={goto} />}
      <main className="main">
        {renderPage()}
        {!presentation.active && (
          <div style={{ marginTop: 60 }}>
            <button
              className="featured-cta"
              onClick={presentation.toggle}
              style={{ borderColor: 'var(--hairline)', color: 'var(--ink-muted)' }}
            >
              🎤 Entrar no Modo Apresentação
            </button>
          </div>
        )}
      </main>
      <Player />
      {bug && <BugDetail bug={bug} onClose={closeBug} />}
    </div>
  );
}
