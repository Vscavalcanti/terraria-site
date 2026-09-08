import { useState } from 'react';
import { useAudio } from '../hooks/useAudio';

export function Player() {
  const { state, manager } = useAudio();
  const [collapsed, setCollapsed] = useState(false);

  if (!state.unlocked) {
    return (
      <div className="player-dock">
        <div className="player-unlock">
          🎵 A apresentação tem trilha sonora por bioma. Seu navegador bloqueia áudio automático — clique para ativar quando quiser.
          <button onClick={() => manager.unlock()}>Ativar música</button>
        </div>
      </div>
    );
  }

  return (
    <div className="player-dock">
      <div className="player-header" onClick={() => setCollapsed((c) => !c)}>
        <span className="player-track-name">🎵 {state.trackLabel ?? 'Nenhuma faixa'}</span>
        <span>{collapsed ? '▲' : '▼'}</span>
      </div>
      {!collapsed && (
        <div className="player-body">
          <div className="player-controls">
            <button className="player-btn" onClick={() => manager.togglePlayPause()} title="Play/Pause">
              {state.isPlaying ? '⏸' : '▶'}
            </button>
            <button className="player-btn" onClick={() => manager.nextTrack()} title="Próxima música">⏭️</button>
            <button
              className={`player-btn ${state.shuffle ? 'active' : ''}`}
              onClick={() => manager.toggleShuffle()}
              title="Shuffle"
            >
              🔀
            </button>
            <button
              className={`player-btn ${state.isMuted ? 'active' : ''}`}
              onClick={() => manager.toggleMute()}
              title="Mute"
            >
              {state.isMuted ? '🔇' : '🔊'}
            </button>
          </div>
          <div className="player-volume">
            <span>🔊</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={state.volume}
              onChange={(e) => manager.setVolume(parseFloat(e.target.value))}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}>{Math.round(state.volume * 100)}%</span>
          </div>
          {state.trackMissing && (
            <div className="player-missing-note">
              Arquivo de áudio não encontrado. Coloque os MP3s em /public/audio/ — o site continua funcionando normalmente sem eles.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
