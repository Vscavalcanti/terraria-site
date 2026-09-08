import { useState } from 'react';
import { CategoryInfo } from '../types/bug';
import { bugsByCategory } from '../data/bugs';
import { BugCard } from '../components/BugCard';
import { FilterBar, EMPTY_FILTERS, applyFilters } from '../components/FilterBar';

export function Category({
  category,
  onOpenBug,
}: {
  category: CategoryInfo;
  onOpenBug: (id: string) => void;
}) {
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const bugs = bugsByCategory(category.key);
  const filtered = applyFilters(bugs, filters);

  return (
    <div>
      <div className="eyebrow-mono">{category.icon} CATEGORIA</div>
      <div className="page-title">{category.label}</div>
      <p className="page-lede">{category.description}</p>

      {bugs.length === 0 ? (
        <div className="empty-note">Nenhum bug documentado nesta categoria ainda.</div>
      ) : (
        <>
          <FilterBar bugs={bugs} filters={filters} onChange={setFilters} />
          <div className="card-grid">
            {filtered.map((bug) => (
              <BugCard key={bug.id} bug={bug} onOpen={onOpenBug} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
