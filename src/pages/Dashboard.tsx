import { BUGS } from '../data/bugs';
import { CATEGORIES } from '../data/categories';
import { ImpactLevel } from '../types/bug';

const IMPACT_ORDER: ImpactLevel[] = ['critico', 'alto', 'moderado', 'baixo'];
const IMPACT_LABEL: Record<ImpactLevel, string> = {
  critico: 'Crítico',
  alto: 'Alto',
  moderado: 'Moderado',
  baixo: 'Baixo',
};

export function Dashboard() {
  const byCategory = CATEGORIES.map((c) => ({
    label: c.label,
    count: BUGS.filter((b) => b.category === c.key).length,
  })).filter((row) => row.count > 0);

  const byImpact = IMPACT_ORDER.map((impact) => ({
    label: IMPACT_LABEL[impact],
    count: BUGS.filter((b) => b.impact === impact).length,
  }));

  const maxCategory = Math.max(1, ...byCategory.map((r) => r.count));
  const maxImpact = Math.max(1, ...byImpact.map((r) => r.count));

  return (
    <div>
      <div className="eyebrow-mono">📊 ANÁLISE</div>
      <div className="page-title">Dashboard</div>
      <p className="page-lede">Distribuição dos bugs catalogados por categoria e por nível de impacto.</p>

      <div className="dash-grid">
        <div className="dash-panel">
          <h3>BUGS POR CATEGORIA</h3>
          {byCategory.map((row) => (
            <BarRow key={row.label} label={row.label} count={row.count} max={maxCategory} />
          ))}
        </div>
        <div className="dash-panel">
          <h3>BUGS POR IMPACTO</h3>
          {byImpact.map((row) => (
            <BarRow key={row.label} label={row.label} count={row.count} max={maxImpact} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BarRow({ label, count, max }: { label: string; count: number; max: number }) {
  return (
    <div className="bar-row">
      <div className="bar-row-label">{label}</div>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${(count / max) * 100}%` }} />
      </div>
      <div className="bar-row-value">{count}</div>
    </div>
  );
}
