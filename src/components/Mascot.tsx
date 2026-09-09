export function Mascot() {
  return (
    <svg className="mascot-scene" viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        className="mascot-hill mascot-hill-back"
        d="M0 190 Q 70 150 150 178 T 300 172 T 480 186 V 260 H 0 Z"
      />
      <path
        className="mascot-hill mascot-hill-front"
        d="M0 214 Q 90 186 190 208 T 380 202 T 480 212 V 260 H 0 Z"
      />
      <line className="mascot-ground" x1="0" y1="230" x2="480" y2="230" />

      {/* slime saltitante — ilustração original, sem cópia de sprite do jogo */}
      <g transform="translate(0 230)">
        <g className="mascot-walk">
          <g className="mascot-hop">
            <path className="mascot-slime" d="M -22 0 C -22 -22 -10 -32 0 -32 C 10 -32 22 -22 22 0 Z" />
            <circle className="mascot-slime-eye" cx="-7" cy="-14" r="2.2" />
            <circle className="mascot-slime-eye" cx="7" cy="-14" r="2.2" />
          </g>
        </g>
      </g>
    </svg>
  );
}
