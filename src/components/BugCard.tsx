import { Bug } from '../types/bug';
import { categoryByKey } from '../data/categories';

export function BugCard({ bug, onOpen }: { bug: Bug; onOpen: (id: string) => void }) {
  const cat = categoryByKey(bug.category);
  return (
    <button className="bug-card" onClick={() => onOpen(bug.id)}>
      {bug.image && (
        <div className="bug-card-image">
          <img src={bug.image} alt="" loading="lazy" />
        </div>
      )}
      <div className="bug-card-cat">{cat?.icon} {cat?.label.toUpperCase()}</div>
      <div className="bug-card-name">{bug.name}</div>
      <div className="bug-card-desc">{bug.description}</div>
      <div className="bug-card-foot">
        <span className={`tag impact-${bug.impact}`}>{bug.impact}</span>
        <span className={`tag status-${bug.status}`}>{bug.status.replace('-', ' ')}</span>
        <span className="tag">{bug.version}</span>
      </div>
    </button>
  );
}
