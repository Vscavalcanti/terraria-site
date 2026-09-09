import { BUGS } from '../data/bugs';
import { categoryByKey } from '../data/categories';
import { biomeByKey } from '../data/biomes';
import { ImpactLevel } from '../types/bug';

const IMPACT_RANK: Record<ImpactLevel, number> = { critico: 4, alto: 3, moderado: 2, baixo: 1 };
const ND = 'Não documentado';

export function TopBugs({ onOpenBug }: { onOpenBug: (id: string) => void }) {
  const top3 = [...BUGS]
    .sort((a, b) => IMPACT_RANK[b.impact] - IMPACT_RANK[a.impact] || Number(b.featured) - Number(a.featured))
    .slice(0, 3);

  return (
    <div>
      <div className="eyebrow-mono">🏆 DESTAQUES</div>
      <div className="page-title">Top 3 Bugs</div>
      <p className="page-lede">Os três bugs de maior impacto do arquivo, com o que acontecia e como cada um foi corrigido — pronto para apresentação.</p>

      <div className="top-bugs">
        {top3.map((bug, i) => {
          const cat = categoryByKey(bug.category);
          const biome = biomeByKey(bug.biome);
          return (
            <article key={bug.id} className="top-bug" onClick={() => onOpenBug(bug.id)}>
              <div className="top-bug-media">
                <span className="top-bug-rank-badge">#{i + 1}</span>
                {bug.image ? (
                  <img src={bug.image} alt={bug.name} />
                ) : (
                  <span className="top-bug-rank">#{i + 1}</span>
                )}
              </div>
              <div className="top-bug-body">
                <div className="eyebrow-mono">
                  {cat?.icon} {cat?.label}
                  {biome ? ` · ${biome.icon} ${biome.label}` : ''} · IMPACTO {bug.impact.toUpperCase()}
                </div>
                <div className="top-bug-title">{bug.name}</div>

                <div className="top-bug-section">
                  <h4>O que acontecia</h4>
                  <p>{bug.description}</p>
                </div>
                <div className="top-bug-section">
                  <h4>Consequência</h4>
                  <p>{bug.consequence}</p>
                </div>
                {bug.fixDescription && (
                  <div className="top-bug-section top-bug-fix">
                    <h4>Como foi corrigido</h4>
                    <p>{bug.fixDescription}</p>
                  </div>
                )}

                <div className="top-bug-meta">
                  <span>Versão: {bug.version}</span>
                  <span>Corrigido em: {bug.fixedVersion || ND}</span>
                  <span className={`tag status-${bug.status}`}>{bug.status.replace('-', ' ')}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
