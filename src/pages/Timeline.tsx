import { VERSIONS } from '../data/versions';
import { bugById } from '../data/bugs';

export function Timeline({ onOpenBug }: { onOpenBug: (id: string) => void }) {
  return (
    <div>
      <div className="eyebrow-mono">🕰️ ANÁLISE</div>
      <div className="page-title">Linha do Tempo</div>
      <p className="page-lede">Versões de Terraria 1.4.5 ("Bigger and Boulder") e os principais bugs corrigidos em cada uma, na ordem em que foram lançadas.</p>

      <div className="timeline-track">
        {VERSIONS.map((v) => (
          <div key={v.version} className="timeline-entry">
            <span className="timeline-version">{v.version}</span>
            <span className="timeline-date">{v.date}</span>
            <div className="timeline-name">{v.name ?? ' '}</div>
            <p className="timeline-summary">{v.summary}</p>
            {v.bugIds.length > 0 && (
              <div className="timeline-bugs">
                {v.bugIds.map((id) => {
                  const bug = bugById(id);
                  if (!bug) return null;
                  return (
                    <button key={id} className="timeline-bug-chip" onClick={() => onOpenBug(id)}>
                      {bug.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
