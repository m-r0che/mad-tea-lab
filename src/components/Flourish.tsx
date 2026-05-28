export function Flourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M10 12 q 30 -14 60 0 q 30 14 60 0 q 30 -14 60 0 q 20 8 40 0" />
      <circle cx="120" cy="12" r="2.2" fill="currentColor" />
      <path d="M115 6 q 5 -4 10 0" />
      <path d="M115 18 q 5 4 10 0" />
    </svg>
  );
}

export function Teapot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 180"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden
    >
      {/* lid (rocks/puffs as if pressure is building) */}
      <g className="teapot-lid">
        <path d="M70 60 Q110 40 150 60" />
        <circle className="teapot-knob" cx="110" cy="40" r="4" fill="currentColor" />
      </g>
      {/* body */}
      <path d="M60 65 Q40 110 70 145 Q110 160 150 145 Q180 110 160 65 Z" />
      {/* spout */}
      <path d="M60 80 Q30 78 18 90 Q14 96 22 100 Q40 98 60 105" />
      {/* handle */}
      <path d="M160 80 Q200 90 200 115 Q200 135 160 140" />
      {/* base shadow line */}
      <path
        d="M70 148 Q110 156 150 148"
        opacity="0.5"
        strokeWidth="0.8"
      />
      {/* steam wisps — rise & fade in a loop */}
      <g strokeWidth="1.2">
        <path className="steam-wisp steam-wisp-a" d="M30 70 q -4 -10 4 -16 q 6 -6 0 -14" />
        <path className="steam-wisp steam-wisp-b" d="M15 80 q -4 -8 2 -14" />
        <path className="steam-wisp steam-wisp-c" d="M42 72 q -3 -8 2 -14" />
      </g>
    </svg>
  );
}

export function PocketWatch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 140"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M60 14 v 6 M50 8 h 20" />
      <path d="M60 20 q -8 4 -8 10" />
      <circle cx="60" cy="74" r="42" />
      <circle cx="60" cy="74" r="36" strokeWidth="0.6" opacity="0.5" />
      <path className="watch-hand-minute" d="M60 74 l 0 -20" />
      <path className="watch-hand-hour" d="M60 74 l 14 6" />
      <circle cx="60" cy="74" r="1.6" fill="currentColor" stroke="none" />
      <text
        x="60"
        y="44"
        fontSize="8"
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        fontFamily="serif"
      >
        XII
      </text>
      <text
        x="60"
        y="110"
        fontSize="8"
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        fontFamily="serif"
      >
        VI
      </text>
    </svg>
  );
}

export function Mushroom({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 140"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 70 Q20 30 60 28 Q100 30 100 70 Q80 78 60 76 Q40 78 20 70 Z" />
      <path d="M42 70 Q42 110 50 124 L 70 124 Q 78 110 78 70" />
      <circle cx="40" cy="50" r="4" stroke="none" fill="currentColor" opacity="0.55" />
      <circle cx="68" cy="42" r="3" stroke="none" fill="currentColor" opacity="0.55" />
      <circle cx="84" cy="58" r="3.5" stroke="none" fill="currentColor" opacity="0.55" />
      <path d="M50 124 q 10 4 20 0" />
    </svg>
  );
}

export function SugarCube({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10 22 L30 12 L50 22 L30 32 Z" />
      <path d="M10 22 L10 42 L30 52 L30 32" />
      <path d="M50 22 L50 42 L30 52" />
    </svg>
  );
}

export function Spoon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 30"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden
    >
      <ellipse cx="14" cy="15" rx="12" ry="8" />
      <path d="M26 15 L94 15" />
      <circle cx="94" cy="15" r="3" />
    </svg>
  );
}
