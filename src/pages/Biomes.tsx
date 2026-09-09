import { useState } from 'react';
import { BIOMES } from '../data/biomes';
import { bugsByBiome } from '../data/bugs';
import { BugCard } from '../components/BugCard';
import { FilterBar, EMPTY_FILTERS, applyFilters } from '../components/FilterBar';

export function Biomes({
  onOpenBug,
  selected,
  onSelect,
}: {
  onOpenBug: (id: string) => void;
  selected: string | null;
  onSelect: (s: string) => void;
}) {
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const activeBiome = BIOMES.find((b) => b.key === selected);
  const bugs = selected ? bugsByBiome(selected) : [];
  const filtered = applyFilters(bugs, filters);

  return (
    <div>
      <div className="eyebrow-mono">🗺️ CATEGORIA</div>
      <div className="page-title">Bugs por Bioma</div>
      <p className="page-lede">Selecione um bioma para ver seus bugs documentados e trocar a trilha sonora de ambientação. Nem todo bioma possui um bug exclusivo — quando não existir, isso é informado explicitamente.</p>

      <div className="biome-grid">
        {BIOMES.map((b) => {
          const count = bugsByBiome(b.key).length;
          return (
            <button
              key={b.key}
              className={`biome-tile ${selected === b.key ? 'active' : ''}`}
              style={{ ['--tile-accent' as any]: b.accent }}
              onClick={() => onSelect(b.key)}
            >
              <div className="biome-tile-icon">{b.icon}</div>
              <div className="biome-tile-label">{b.label}</div>
              <div className="biome-tile-count">{count} bug{count === 1 ? '' : 's'} documentado{count === 1 ? '' : 's'}</div>
            </button>
          );
        })}
      </div>

      {activeBiome && (
        <div className="biome-active-panel" style={{ ['--tile-accent' as any]: activeBiome.accent }}>
          <div className="section-heading">{activeBiome.icon} {activeBiome.label}</div>
          {bugs.length === 0 ? (
            <div className="biome-empty-note">
              Não foi encontrado um bug exclusivo documentado para o bioma {activeBiome.label} nas fontes consultadas para este arquivo. Isso não significa que o bioma nunca teve bugs — apenas que nenhum caso específico e verificável foi catalogado aqui.
            </div>
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
      )}
    </div>
  );
}
