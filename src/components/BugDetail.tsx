import { Bug } from '../types/bug';
import { categoryByKey } from '../data/categories';
import { biomeByKey } from '../data/biomes';

const ND = 'Não documentado';

export function BugDetail({ bug, onClose }: { bug: Bug; onClose: () => void }) {
  const cat = categoryByKey(bug.category);
  const biome = biomeByKey(bug.biome);

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-panel" onClick={(e) => e.stopPropagation()}>
        <button className="detail-close" onClick={onClose} aria-label="Fechar">✕</button>
        <div className="eyebrow-mono">{cat?.icon} {cat?.label}{biome ? ` · ${biome.icon} ${biome.label}` : ''}</div>
        <div className="detail-title">{bug.name}</div>

        <div className="detail-grid">
          <Field label="Versão associada" value={bug.version} />
          <Field label="Introduzido em" value={bug.introducedVersion || ND} />
          <Field label="Primeira versão documentada" value={bug.firstDocumentedVersion || ND} />
          <Field label="Primeiro relato" value={bug.reportedDate || ND} />
          <Field label="Plataforma" value={bug.platform} />
          <Field label="Impacto" value={bug.impact} />
          <Field label="Status" value={bug.status.replace('-', ' ')} />
          <Field label="Corrigido em" value={bug.fixedVersion || ND} />
          <Field label="Data da correção" value={bug.fixedDate || ND} />
        </div>

        <div className="detail-section">
          <h4>Como acontecia</h4>
          <p>{bug.description}</p>
        </div>

        {bug.reproduction && (
          <div className="detail-section">
            <h4>Como reproduzir</h4>
            <p>{bug.reproduction}</p>
          </div>
        )}

        <div className="detail-section">
          <h4>Consequência</h4>
          <p>{bug.consequence}</p>
        </div>

        {bug.fixDescription && (
          <div className="detail-section">
            <h4>Como foi corrigido</h4>
            <p>{bug.fixDescription}</p>
          </div>
        )}

        <div className="detail-section">
          <h4>Fontes</h4>
          <ul className="detail-sources" style={{ margin: 0, paddingLeft: 18 }}>
            {bug.sources.map((s, i) => (
              <li key={i}>
                {s.url ? <a href={s.url} target="_blank" rel="noreferrer">{s.label}</a> : s.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="detail-field-label">{label.toUpperCase()}</div>
      <div className="detail-field-value">{value}</div>
    </div>
  );
}
