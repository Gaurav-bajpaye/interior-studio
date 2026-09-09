/* -----------------------------------------------------------------
   A cloud kitchen in plan.

   There is no photograph of one of ours yet, and a stock kitchen either
   looks domestic or looks like a press photo of somebody else's line.
   So this is drawn rather than borrowed: a layout of the kind the studio
   produces at concept stage, which is honest about what it is, carries
   no licence, and says more about how we think than a photograph would.

   Zones read anticlockwise the way the food does — goods in, cold and
   dry store, prep, the hot line under the hood, plate-up, then out
   through the dispatch window.
   ----------------------------------------------------------------- */
export default function KitchenPlan({ className = '' }) {
  const navy = 'var(--color-navy)'
  const gold = 'var(--color-gold)'
  const ink = 'var(--color-muted)'

  /* One place for the label styling so the drawing stays consistent. */
  const zone = { fontSize: 11, letterSpacing: 1.6, fontWeight: 600, fill: navy }
  const note = { fontSize: 9, letterSpacing: 1.2, fill: ink }

  return (
    <svg
      viewBox="0 0 600 400"
      className={className}
      role="img"
      aria-label="Plan of a compact cloud kitchen: goods in, cold and dry store, a prep run, the hot line under an extract hood, plate-up, and a dispatch window."
      style={{ background: 'var(--color-shell)' }}
    >
      {/* faint setting-out grid, the way a drawing sheet reads */}
      <defs>
        <pattern id="ck-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0v20" fill="none" stroke={navy} strokeWidth=".4" opacity=".08" />
        </pattern>
        <pattern id="ck-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={gold} strokeWidth="1.4" opacity=".5" />
        </pattern>
      </defs>
      <rect width="600" height="400" fill="url(#ck-grid)" />

      {/* shell — double line for wall thickness */}
      <rect x="52" y="46" width="496" height="286" fill="none" stroke={navy} strokeWidth="6" />
      <rect x="60" y="54" width="480" height="270" fill="none" stroke={navy} strokeWidth="1" opacity=".35" />

      {/* ---- dry + cold store, left bay ---- */}
      <line x1="196" y1="54" x2="196" y2="324" stroke={navy} strokeWidth="2" opacity=".5" />
      <rect x="72" y="66" width="46" height="112" fill="url(#ck-hatch)" stroke={navy} strokeWidth="1.5" />
      <rect x="72" y="190" width="46" height="80" fill="none" stroke={navy} strokeWidth="1.5" />
      {/* clear of the door swing below */}
      <text x="128" y="290" style={zone}>STORE</text>
      <text x="128" y="304" style={note}>COLD + DRY</text>

      {/* ---- prep run, centre ---- */}
      <rect x="212" y="66" width="150" height="30" fill="none" stroke={navy} strokeWidth="1.5" />
      <text x="216" y="112" style={note}>PREP  4.5 m</text>
      {/* sinks */}
      <circle cx="236" cy="81" r="7" fill="none" stroke={navy} strokeWidth="1.2" />
      <circle cx="258" cy="81" r="7" fill="none" stroke={navy} strokeWidth="1.2" />

      {/* ---- the hot line, under the hood ---- */}
      <rect x="212" y="252" width="150" height="30" fill="url(#ck-hatch)" stroke={navy} strokeWidth="1.5" />
      <rect x="204" y="242" width="166" height="50" fill="none" stroke={gold} strokeWidth="1.4" strokeDasharray="6 4" />
      <text x="212" y="232" style={zone}>HOT LINE</text>
      <text x="212" y="308" style={note}>EXTRACT HOOD OVER</text>
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={232 + i * 34} cy="267" r="8" fill="none" stroke={navy} strokeWidth="1.2" />
      ))}

      {/* ---- plate-up and dispatch, right bay ---- */}
      <line x1="392" y1="54" x2="392" y2="324" stroke={navy} strokeWidth="2" opacity=".5" />
      <rect x="408" y="120" width="116" height="30" fill="none" stroke={navy} strokeWidth="1.5" />
      <text x="408" y="108" style={zone}>PLATE-UP</text>

      {/* dispatch window punched through the right wall */}
      <rect x="544" y="180" width="8" height="70" fill="var(--color-shell)" />
      <line x1="548" y1="180" x2="548" y2="250" stroke={gold} strokeWidth="3" />
      <text x="408" y="200" style={zone}>DISPATCH</text>
      <path d="M470 216h74" stroke={gold} strokeWidth="1.6" strokeDasharray="5 4" />
      <path d="m538 210 8 6-8 6" fill="none" stroke={gold} strokeWidth="1.6" />
      <text x="408" y="216" style={note}>RIDERS</text>

      {/* goods-in door, bottom left, with its swing */}
      <path d="M52 300v-46" stroke="var(--color-shell)" strokeWidth="7" />
      <path d="M52 254a46 46 0 0 1 46 46" fill="none" stroke={navy} strokeWidth="1" opacity=".5" />
      <text x="70" y="352" style={note}>GOODS IN</text>

      {/* overall dimension, the way a plan is annotated */}
      <g opacity=".65">
        <path d="M52 372h496" stroke={ink} strokeWidth="1" />
        <path d="M52 366v12M548 366v12" stroke={ink} strokeWidth="1" />
        <rect x="266" y="362" width="68" height="16" fill="var(--color-shell)" />
        <text x="272" y="374" style={note}>14.8 m</text>
      </g>
    </svg>
  )
}
