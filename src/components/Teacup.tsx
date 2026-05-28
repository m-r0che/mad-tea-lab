type TeacupProps = {
  color: string;
  size?: number;
  className?: string;
};

export function Teacup({ color, size = 160, className }: TeacupProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <defs>
        <clipPath id={`cup-clip-${color.replace("#", "")}`}>
          <path d="M40 70 Q40 140 100 145 Q160 140 160 70 Z" />
        </clipPath>
      </defs>

      {/* Saucer */}
      <ellipse cx="100" cy="170" rx="78" ry="10" fill="#2a1e2f" opacity="0.15" />
      <path
        d="M22 162 Q100 178 178 162 Q178 174 100 184 Q22 174 22 162 Z"
        fill="#fbf3dc"
        stroke="#2a1e2f"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M30 164 Q100 174 170 164"
        fill="none"
        stroke="#2a1e2f"
        strokeWidth="0.8"
        opacity="0.5"
      />

      {/* Cup body */}
      <path
        d="M40 70 Q40 140 100 145 Q160 140 160 70 Z"
        fill="#fbf3dc"
        stroke="#2a1e2f"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Tea liquid (user color) */}
      <g clipPath={`url(#cup-clip-${color.replace("#", "")})`}>
        <rect x="40" y="75" width="120" height="80" fill={color} />
        {/* Subtle highlight ellipse on the tea surface */}
        <ellipse cx="100" cy="78" rx="55" ry="6" fill="white" opacity="0.18" />
      </g>

      {/* Rim ellipse */}
      <ellipse
        cx="100"
        cy="70"
        rx="60"
        ry="8"
        fill="none"
        stroke="#2a1e2f"
        strokeWidth="1.8"
      />
      <ellipse
        cx="100"
        cy="70"
        rx="55"
        ry="6"
        fill="none"
        stroke="#2a1e2f"
        strokeWidth="0.6"
        opacity="0.6"
      />

      {/* Handle */}
      <path
        d="M160 85 Q188 88 188 110 Q188 132 160 128"
        fill="none"
        stroke="#2a1e2f"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M160 92 Q180 95 180 110 Q180 124 160 122"
        fill="none"
        stroke="#2a1e2f"
        strokeWidth="0.8"
        opacity="0.5"
      />

      {/* Steam wisps */}
      <g
        fill="none"
        stroke="#2a1e2f"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      >
        <path className="steam-wisp steam-wisp-a" d="M78 55 q -4 -8 2 -14 q 5 -6 0 -12" />
        <path className="steam-wisp steam-wisp-b" d="M100 50 q -4 -8 2 -14 q 5 -6 0 -12" />
        <path className="steam-wisp steam-wisp-c" d="M122 55 q -4 -8 2 -14 q 5 -6 0 -12" />
      </g>
    </svg>
  );
}
