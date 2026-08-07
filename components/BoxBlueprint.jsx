'use client';

import { motion } from 'motion/react';
import Icon from '@/components/Icon';

/**
 * Flat 2D die-cut blueprint showing cut lines, fold lines, and glue tabs
 * for a corrugated shipping box. Uses the product's actual dimensions
 * to render a proportional SVG dieline.
 *
 * Inspired by packaging industry die-cut diagrams:
 * - Solid blue lines = cut lines (outer boundary)
 * - Dashed red lines = fold / crease lines
 * - Hatched areas = glue tabs
 */
export default function BoxBlueprint({ product }) {
  if (!product || product.ply === 'N/A') return null;

  const L = product.length;
  const W = product.width;
  const H = product.height;

  // If height is 0 (flat items like courier bags), skip
  if (!H) return null;

  // Scale factor for SVG rendering (pixels per inch)
  const scale = 18;
  const tabW = Math.min(H * 0.5, 1.2) * scale; // glue tab width
  const flapH = Math.min(W * 0.45, H * 0.8) * scale; // top/bottom flap height

  // Panel dimensions in SVG units
  const pw = L * scale; // panel width (length)
  const ph = W * scale; // panel height (width)
  const sw = H * scale; // side panel width (height)

  // Total dieline dimensions
  const totalW = tabW + pw + sw + pw + sw + 8;
  const totalH = flapH + sw + ph + sw + flapH + 8;

  // Origin offsets
  const ox = tabW + 4;
  const oy = flapH + 4;

  // Dimension label style
  const dimStyle = {
    fontSize: 9,
    fill: '#5c5c5c',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: 500,
  };

  const dimValueStyle = {
    fontSize: 10,
    fill: '#1a1a1a',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: 700,
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="container-bk pb-12 md:pb-16"
    >
      <div className="card-bk overflow-hidden">
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-border">
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-1">
            Die-Cut Blueprint
          </h3>
          <p className="text-xs text-text-secondary">
            Flat pattern showing how this box is cut and folded from a single
            sheet.
          </p>
        </div>

        <div className="p-5 md:p-8">
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-0 border-t-2 border-[#2563eb]" />
              <span className="text-xs text-text-secondary font-medium flex items-center gap-1">
                <Icon name="Scissors" size={12} className="text-[#2563eb]" />
                Cut Line
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0 border-t-2 border-dashed border-[#dc2626]" />
              <span className="text-xs text-text-secondary font-medium flex items-center gap-1">
                <Icon
                  name="FoldVertical"
                  size={12}
                  className="text-[#dc2626]"
                />
                Fold Line
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-3 bg-[#2563eb]/8 border border-[#2563eb]/30 rounded-sm" />
              <span className="text-xs text-text-secondary font-medium flex items-center gap-1">
                <Icon name="Droplets" size={12} className="text-[#2563eb]" />
                Glue Tab
              </span>
            </div>
          </div>

          {/* SVG Blueprint */}
          <div className="overflow-x-auto">
            <div className="min-w-[400px]">
              <svg
                viewBox={`0 0 ${totalW} ${totalH}`}
                className="w-full h-auto max-h-[500px]"
                style={{ background: '#fafafa' }}
                role="img"
                aria-label={`Die-cut blueprint for ${product.name}: ${L}×${W}×${H} inch box`}
              >
                <defs>
                  {/* Hatch pattern for glue tabs */}
                  <pattern
                    id="hatch"
                    patternUnits="userSpaceOnUse"
                    width="6"
                    height="6"
                    patternTransform="rotate(45)"
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="6"
                      stroke="#2563eb"
                      strokeWidth="0.5"
                      opacity="0.25"
                    />
                  </pattern>
                </defs>

                {/* ========== MAIN PANELS ========== */}

                {/* Panel 1: Left (Lid/Top) — L × W */}
                <rect
                  x={ox}
                  y={oy}
                  width={pw}
                  height={ph}
                  fill="white"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                />
                {/* Label */}
                <text
                  x={ox + pw / 2}
                  y={oy + ph / 2 - 6}
                  textAnchor="middle"
                  {...dimStyle}
                >
                  TOP / LID
                </text>
                <text
                  x={ox + pw / 2}
                  y={oy + ph / 2 + 8}
                  textAnchor="middle"
                  {...dimValueStyle}
                >
                  {L}&quot; × {W}&quot;
                </text>

                {/* Panel 2: Left Side — H × W */}
                <rect
                  x={ox + pw}
                  y={oy}
                  width={sw}
                  height={ph}
                  fill="white"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                />
                {/* Fold line between Panel 1 & 2 */}
                <line
                  x1={ox + pw}
                  y1={oy}
                  x2={ox + pw}
                  y2={oy + ph}
                  stroke="#dc2626"
                  strokeWidth="1"
                  strokeDasharray="4,3"
                />
                <text
                  x={ox + pw + sw / 2}
                  y={oy + ph / 2 - 6}
                  textAnchor="middle"
                  {...dimStyle}
                >
                  SIDE
                </text>
                <text
                  x={ox + pw + sw / 2}
                  y={oy + ph / 2 + 8}
                  textAnchor="middle"
                  {...dimValueStyle}
                >
                  {H}&quot; × {W}&quot;
                </text>

                {/* Panel 3: Bottom — L × W */}
                <rect
                  x={ox + pw + sw}
                  y={oy}
                  width={pw}
                  height={ph}
                  fill="white"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                />
                {/* Fold line between Panel 2 & 3 */}
                <line
                  x1={ox + pw + sw}
                  y1={oy}
                  x2={ox + pw + sw}
                  y2={oy + ph}
                  stroke="#dc2626"
                  strokeWidth="1"
                  strokeDasharray="4,3"
                />
                <text
                  x={ox + pw + sw + pw / 2}
                  y={oy + ph / 2 - 6}
                  textAnchor="middle"
                  {...dimStyle}
                >
                  BOTTOM
                </text>
                <text
                  x={ox + pw + sw + pw / 2}
                  y={oy + ph / 2 + 8}
                  textAnchor="middle"
                  {...dimValueStyle}
                >
                  {L}&quot; × {W}&quot;
                </text>

                {/* Panel 4: Right Side — H × W */}
                <rect
                  x={ox + pw * 2 + sw}
                  y={oy}
                  width={sw}
                  height={ph}
                  fill="white"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                />
                {/* Fold line between Panel 3 & 4 */}
                <line
                  x1={ox + pw * 2 + sw}
                  y1={oy}
                  x2={ox + pw * 2 + sw}
                  y2={oy + ph}
                  stroke="#dc2626"
                  strokeWidth="1"
                  strokeDasharray="4,3"
                />
                <text
                  x={ox + pw * 2 + sw + sw / 2}
                  y={oy + ph / 2 - 6}
                  textAnchor="middle"
                  {...dimStyle}
                >
                  SIDE
                </text>
                <text
                  x={ox + pw * 2 + sw + sw / 2}
                  y={oy + ph / 2 + 8}
                  textAnchor="middle"
                  {...dimValueStyle}
                >
                  {H}&quot; × {W}&quot;
                </text>

                {/* ========== GLUE TAB (left of Panel 1) ========== */}
                <polygon
                  points={`
                    ${ox},${oy + 4}
                    ${ox - tabW + 4},${oy + 8}
                    ${ox - tabW + 4},${oy + ph - 8}
                    ${ox},${oy + ph - 4}
                  `}
                  fill="url(#hatch)"
                  stroke="#2563eb"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
                <text
                  x={ox - tabW / 2 + 2}
                  y={oy + ph / 2 + 3}
                  textAnchor="middle"
                  fontSize="7"
                  fill="#2563eb"
                  fontFamily="Inter, system-ui, sans-serif"
                  fontWeight="600"
                >
                  GLUE
                </text>

                {/* ========== TOP FLAPS ========== */}

                {/* Top flap for Panel 1 (lid) — full width */}
                <polygon
                  points={`
                    ${ox},${oy}
                    ${ox + 6},${oy - flapH + 6}
                    ${ox + pw - 6},${oy - flapH + 6}
                    ${ox + pw},${oy}
                  `}
                  fill="white"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <line
                  x1={ox}
                  y1={oy}
                  x2={ox + pw}
                  y2={oy}
                  stroke="#dc2626"
                  strokeWidth="1"
                  strokeDasharray="4,3"
                />

                {/* Top flap for Side Panel 2 — narrow ear */}
                <polygon
                  points={`
                    ${ox + pw},${oy}
                    ${ox + pw + 3},${oy - flapH * 0.6}
                    ${ox + pw + sw - 3},${oy - flapH * 0.6}
                    ${ox + pw + sw},${oy}
                  `}
                  fill="url(#hatch)"
                  stroke="#2563eb"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />

                {/* Top flap for Panel 3 (bottom) — full width */}
                <polygon
                  points={`
                    ${ox + pw + sw},${oy}
                    ${ox + pw + sw + 6},${oy - flapH + 6}
                    ${ox + pw + sw + pw - 6},${oy - flapH + 6}
                    ${ox + pw + sw + pw},${oy}
                  `}
                  fill="white"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <line
                  x1={ox + pw + sw}
                  y1={oy}
                  x2={ox + pw + sw + pw}
                  y2={oy}
                  stroke="#dc2626"
                  strokeWidth="1"
                  strokeDasharray="4,3"
                />

                {/* Top flap for Side Panel 4 — narrow ear */}
                <polygon
                  points={`
                    ${ox + pw * 2 + sw},${oy}
                    ${ox + pw * 2 + sw + 3},${oy - flapH * 0.6}
                    ${ox + pw * 2 + sw + sw - 3},${oy - flapH * 0.6}
                    ${ox + pw * 2 + sw + sw},${oy}
                  `}
                  fill="url(#hatch)"
                  stroke="#2563eb"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />

                {/* ========== BOTTOM FLAPS ========== */}

                {/* Bottom flap for Panel 1 */}
                <polygon
                  points={`
                    ${ox},${oy + ph}
                    ${ox + 6},${oy + ph + flapH - 6}
                    ${ox + pw - 6},${oy + ph + flapH - 6}
                    ${ox + pw},${oy + ph}
                  `}
                  fill="white"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <line
                  x1={ox}
                  y1={oy + ph}
                  x2={ox + pw}
                  y2={oy + ph}
                  stroke="#dc2626"
                  strokeWidth="1"
                  strokeDasharray="4,3"
                />

                {/* Bottom flap for Side Panel 2 */}
                <polygon
                  points={`
                    ${ox + pw},${oy + ph}
                    ${ox + pw + 3},${oy + ph + flapH * 0.6}
                    ${ox + pw + sw - 3},${oy + ph + flapH * 0.6}
                    ${ox + pw + sw},${oy + ph}
                  `}
                  fill="url(#hatch)"
                  stroke="#2563eb"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />

                {/* Bottom flap for Panel 3 */}
                <polygon
                  points={`
                    ${ox + pw + sw},${oy + ph}
                    ${ox + pw + sw + 6},${oy + ph + flapH - 6}
                    ${ox + pw + sw + pw - 6},${oy + ph + flapH - 6}
                    ${ox + pw + sw + pw},${oy + ph}
                  `}
                  fill="white"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <line
                  x1={ox + pw + sw}
                  y1={oy + ph}
                  x2={ox + pw + sw + pw}
                  y2={oy + ph}
                  stroke="#dc2626"
                  strokeWidth="1"
                  strokeDasharray="4,3"
                />

                {/* Bottom flap for Side Panel 4 */}
                <polygon
                  points={`
                    ${ox + pw * 2 + sw},${oy + ph}
                    ${ox + pw * 2 + sw + 3},${oy + ph + flapH * 0.6}
                    ${ox + pw * 2 + sw + sw - 3},${oy + ph + flapH * 0.6}
                    ${ox + pw * 2 + sw + sw},${oy + ph}
                  `}
                  fill="url(#hatch)"
                  stroke="#2563eb"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />

                {/* ========== DIMENSION ANNOTATIONS ========== */}

                {/* Width dimension (bottom, under Panel 3) */}
                <g>
                  <line
                    x1={ox + pw + sw}
                    y1={oy + ph + flapH + 2}
                    x2={ox + pw + sw + pw}
                    y2={oy + ph + flapH + 2}
                    stroke="#8a8a8a"
                    strokeWidth="0.5"
                  />
                  <line
                    x1={ox + pw + sw}
                    y1={oy + ph + flapH - 2}
                    x2={ox + pw + sw}
                    y2={oy + ph + flapH + 6}
                    stroke="#8a8a8a"
                    strokeWidth="0.5"
                  />
                  <line
                    x1={ox + pw + sw + pw}
                    y1={oy + ph + flapH - 2}
                    x2={ox + pw + sw + pw}
                    y2={oy + ph + flapH + 6}
                    stroke="#8a8a8a"
                    strokeWidth="0.5"
                  />
                  <text
                    x={ox + pw + sw + pw / 2}
                    y={oy + ph + flapH + 6}
                    textAnchor="middle"
                    fontSize="8"
                    fill="#8a8a8a"
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    {L}&quot;
                  </text>
                </g>

                {/* Height dimension (right side) */}
                <g>
                  <line
                    x1={ox + pw * 2 + sw * 2 + 3}
                    y1={oy}
                    x2={ox + pw * 2 + sw * 2 + 3}
                    y2={oy + ph}
                    stroke="#8a8a8a"
                    strokeWidth="0.5"
                  />
                  <line
                    x1={ox + pw * 2 + sw * 2}
                    y1={oy}
                    x2={ox + pw * 2 + sw * 2 + 6}
                    y2={oy}
                    stroke="#8a8a8a"
                    strokeWidth="0.5"
                  />
                  <line
                    x1={ox + pw * 2 + sw * 2}
                    y1={oy + ph}
                    x2={ox + pw * 2 + sw * 2 + 6}
                    y2={oy + ph}
                    stroke="#8a8a8a"
                    strokeWidth="0.5"
                  />
                  <text
                    x={ox + pw * 2 + sw * 2 + 5}
                    y={oy + ph / 2 + 3}
                    fontSize="8"
                    fill="#8a8a8a"
                    fontFamily="Inter, system-ui, sans-serif"
                    writingMode="tb"
                    textAnchor="middle"
                  >
                    {W}&quot;
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* Dimensions Summary */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-warm-gray rounded-xl p-3 text-center">
              <p className="text-[10px] text-text-tertiary uppercase tracking-wider font-medium">
                Length
              </p>
              <p className="text-lg font-bold text-charcoal">{L}&quot;</p>
            </div>
            <div className="bg-warm-gray rounded-xl p-3 text-center">
              <p className="text-[10px] text-text-tertiary uppercase tracking-wider font-medium">
                Width
              </p>
              <p className="text-lg font-bold text-charcoal">{W}&quot;</p>
            </div>
            <div className="bg-warm-gray rounded-xl p-3 text-center">
              <p className="text-[10px] text-text-tertiary uppercase tracking-wider font-medium">
                Height
              </p>
              <p className="text-lg font-bold text-charcoal">{H}&quot;</p>
            </div>
            <div className="bg-warm-gray rounded-xl p-3 text-center">
              <p className="text-[10px] text-text-tertiary uppercase tracking-wider font-medium">
                Ply
              </p>
              <p className="text-lg font-bold text-charcoal">{product.ply}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
