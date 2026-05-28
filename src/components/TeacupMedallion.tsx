/**
 * Hand-drawn ink oval framing a teacup filled with the drinker's tea
 * colour — tea-brown ink, parchment fill, ornate flourishes at top/bottom.
 */
export function TeacupMedallion({
  color,
  size = 220,
  className,
}: {
  color: string;
  size?: number;
  className?: string;
}) {
  const clipId = `tcm-clip-${color.replace("#", "")}`;
  return (
    <svg
      viewBox="0 0 240 280"
      width={size}
      height={(size * 280) / 240}
      className={className}
      aria-hidden
    >
      {/* outer wobbly oval — slightly irregular path for hand-drawn feel */}
      <path
        d="M 120 14
           C 178 14 226 70 226 140
           C 226 212 178 266 120 266
           C 62 266 14 212 14 140
           C 14 70 62 14 120 14 Z"
        fill="#fbf3dc"
        stroke="#5c2410"
        strokeWidth="1.8"
      />
      {/* inner hairline */}
      <ellipse
        cx="120"
        cy="140"
        rx="100"
        ry="118"
        fill="none"
        stroke="#5c2410"
        strokeWidth="0.6"
        opacity="0.4"
      />
      {/* faint tea-stain wash inside */}
      <ellipse
        cx="120"
        cy="140"
        rx="98"
        ry="116"
        fill="#8b3a1f"
        opacity="0.04"
      />

      {/* top flourish — ink curl with leaves */}
      <g stroke="#5c2410" strokeWidth="1.2" fill="none" strokeLinecap="round">
        <path d="M120 6 q -8 8 0 16 q 8 -8 0 -16 z" fill="#5c2410" />
        <path d="M108 16 q -10 2 -16 8" />
        <path d="M132 16 q 10 2 16 8" />
        <circle cx="92" cy="22" r="1.3" fill="#5c2410" />
        <circle cx="148" cy="22" r="1.3" fill="#5c2410" />
      </g>

      {/* bottom flourish */}
      <g stroke="#5c2410" strokeWidth="1.2" fill="none" strokeLinecap="round">
        <path d="M120 274 q -8 -8 0 -16 q 8 8 0 16 z" fill="#5c2410" />
        <path d="M108 264 q -10 -2 -16 -8" />
        <path d="M132 264 q 10 -2 16 -8" />
        <path d="M114 252 q 6 4 12 0" />
      </g>

      {/* side ornaments — small leaf curls */}
      <g stroke="#5c2410" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.7">
        <path d="M14 140 q -6 -4 -10 0 q 4 4 10 0" />
        <path d="M226 140 q 6 -4 10 0 q -4 4 -10 0" />
      </g>

      <defs>
        <clipPath id={clipId}>
          <path d="M70 110 Q70 175 120 180 Q170 175 170 110 Z" />
        </clipPath>
      </defs>

      {/* saucer */}
      <ellipse cx="120" cy="208" rx="68" ry="8" fill="#5c2410" opacity="0.12" />
      <path
        d="M56 200 Q120 213 184 200 Q184 210 120 218 Q56 210 56 200 Z"
        fill="#fbf3dc"
        stroke="#5c2410"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M64 202 Q120 211 176 202"
        fill="none"
        stroke="#5c2410"
        strokeWidth="0.7"
        opacity="0.5"
      />

      {/* cup body */}
      <path
        d="M70 110 Q70 175 120 180 Q170 175 170 110 Z"
        fill="#fbf3dc"
        stroke="#5c2410"
        strokeWidth="1.8"
      />

      {/* tea liquid (user colour) */}
      <g clipPath={`url(#${clipId})`}>
        <rect x="60" y="115" width="120" height="80" fill={color} />
        <ellipse cx="120" cy="118" rx="46" ry="5" fill="white" opacity="0.18" />
      </g>

      {/* rim */}
      <ellipse
        cx="120"
        cy="110"
        rx="50"
        ry="7"
        fill="none"
        stroke="#5c2410"
        strokeWidth="1.8"
      />
      <ellipse
        cx="120"
        cy="110"
        rx="46"
        ry="5"
        fill="none"
        stroke="#5c2410"
        strokeWidth="0.6"
        opacity="0.5"
      />

      {/* handle */}
      <path
        d="M170 122 Q198 124 198 142 Q198 162 170 158"
        fill="none"
        stroke="#5c2410"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* steam */}
      <g fill="none" stroke="#5c2410" strokeWidth="1.1" strokeLinecap="round" opacity="0.7">
        <path className="steam-wisp steam-wisp-a" d="M100 100 q -4 -8 2 -14 q 5 -6 0 -12" />
        <path className="steam-wisp steam-wisp-b" d="M120 95 q -4 -8 2 -14 q 5 -6 0 -12" />
        <path className="steam-wisp steam-wisp-c" d="M140 100 q -4 -8 2 -14 q 5 -6 0 -12" />
      </g>
    </svg>
  );
}
