import { BUGS } from '../data/bugs';
import { VERSIONS } from '../data/versions';
import { BIOMES } from '../data/biomes';
import { CATEGORIES } from '../data/categories';
import { Mascot } from '../components/Mascot';

export function Home({ onOpenBug, onNavigate }: { onOpenBug: (id: string) => void; onNavigate: (p: string) => void }) {
  const total = BUGS.length;
  const fixed = BUGS.filter((b) => b.status === 'corrigido').length;
  const unfixed = BUGS.filter((b) => b.status === 'nao-corrigido' || b.status === 'parcial').length;
  const critical = BUGS.filter((b) => b.impact === 'critico').length;
  const biomesWithBug = new Set(BUGS.filter((b) => b.biome).map((b) => b.biome)).size;
  const featured = BUGS.find((b) => b.featured);

  return (
    <div>
      <div className="hero-split">
        <div className="hero-media">
          <Mascot />
        </div>
        <div className="hero-copy">
          <div className="eyebrow-mono">ARQUIVO — TERRARIA v1.4.5</div>
          <div className="hero-title">Terraria Bug Archive</div>
          <p className="hero-sub">Uma história dos bugs, exploits e falhas que marcaram Terraria — documentada versão a versão, bioma a bioma, com fontes verificáveis para cada entrada.</p>
          <div className="hero-facts">
            <div className="hero-fact"><strong>{total}</strong> bugs catalogados em <strong>{VERSIONS.length}</strong> versões</div>
            <div className="hero-fact"><strong>{fixed}</strong> corrigidos · <strong>{unfixed}</strong> ainda em aberto</div>
            <div className="hero-fact"><strong>{biomesWithBug}</strong> de {BIOMES.length} biomas com bug documentado</div>
          </div>
        </div>
      </div>

      <div className="stat-grid">
        <Stat n={total} label="Bugs catalogados" />
        <Stat n={fixed} label="Bugs corrigidos" />
        <Stat n={unfixed} label="Não corrigidos / parciais" />
        <Stat n={critical} label="Impacto crítico" />
        <Stat n={VERSIONS.length} label="Versões analisadas" />
        <Stat n={biomesWithBug} label={`Biomas c/ bug (de ${BIOMES.length})`} />
        <Stat n={CATEGORIES.length} label="Categorias" />
      </div>

      {featured && (
        <div className="featured-panel">
          <div className="featured-kicker">🔴 BUG EM DESTAQUE · IMPACTO CRÍTICO</div>
          <div className="featured-title">{featured.name}</div>
          <p className="featured-body">{featured.description} {featured.consequence}</p>
          <button className="featured-cta" onClick={() => onOpenBug(featured.id)}>Ver ficha completa →</button>
        </div>
      )}

      <div className="section-heading">Explore por categoria</div>
      <div className="card-grid">
        {CATEGORIES.map((c) => (
          <button key={c.key} className="bug-card" onClick={() => onNavigate(c.key)}>
            <div className="bug-card-cat">{c.icon} CATEGORIA</div>
            <div className="bug-card-name">{c.label}</div>
            <div className="bug-card-desc">{c.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="stat-cell">
      <div className="stat-number">{n}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
