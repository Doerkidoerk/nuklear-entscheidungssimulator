import { useMemo } from 'react'
import { Coordinates, ICBMTrajectory, WorldFlags } from '../types'
import { landmasses } from '../data/worldOutline'

interface MapViewProps {
  trajectories: ICBMTrajectory[]
  elapsedTime: number
  flags?: WorldFlags
}

// ============================================
// Polare Lagekarte (azimutal-äquidistant, Nordpol im Zentrum)
// ============================================
// Die klassische NORAD-Sicht: Raketen zwischen Russland und Nordamerika
// fliegen über die Arktis - auf dieser Projektion fast gerade Linien.
const SIZE = 400
const C = SIZE / 2
const R = 190
const MIN_LAT = 5
const ROTATE = -100 // Längengrad, der unten liegt (Nordamerika)

const project = (lat: number, lng: number): [number, number] => {
  const r = ((90 - lat) / (90 - MIN_LAT)) * R
  const theta = ((lng - ROTATE) * Math.PI) / 180
  return [C + r * Math.sin(theta), C + r * Math.cos(theta)]
}

const toVec = (c: Coordinates) => {
  const la = (c.lat * Math.PI) / 180
  const lo = (c.lng * Math.PI) / 180
  return [Math.cos(la) * Math.cos(lo), Math.cos(la) * Math.sin(lo), Math.sin(la)]
}

// Großkreis-Interpolation zwischen Start und Ziel
const greatCircle = (a: Coordinates, b: Coordinates, t: number): Coordinates => {
  const va = toVec(a)
  const vb = toVec(b)
  const dot = Math.min(1, Math.max(-1, va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2]))
  const omega = Math.acos(dot)
  if (omega < 1e-6) return a
  const s = Math.sin(omega)
  const k1 = Math.sin((1 - t) * omega) / s
  const k2 = Math.sin(t * omega) / s
  const v = [0, 1, 2].map(i => k1 * va[i] + k2 * vb[i])
  return {
    lat: (Math.atan2(v[2], Math.hypot(v[0], v[1])) * 180) / Math.PI,
    lng: (Math.atan2(v[1], v[0]) * 180) / Math.PI,
  }
}

const pathFor = (a: Coordinates, b: Coordinates, from: number, to: number, steps = 40): string => {
  const pts: string[] = []
  for (let i = 0; i <= steps; i++) {
    const t = from + ((to - from) * i) / steps
    const p = greatCircle(a, b, t)
    const [x, y] = project(p.lat, p.lng)
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return `M${pts.join('L')}`
}

const shortName = (name?: string) => (name || '').split(' (')[0].split(' /')[0]

const formatEta = (seconds: number) => {
  const s = Math.max(0, Math.round(seconds))
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`
}

export default function MapView({ trajectories, elapsedTime, flags }: MapViewProps) {
  const landPaths = useMemo(
    () =>
      landmasses.map(poly =>
        `M${poly.map(([lng, lat]) => project(lat, lng).map(v => v.toFixed(1)).join(',')).join('L')}Z`,
      ),
    [],
  )

  const graticule = useMemo(() => {
    const circles = [30, 60].map(lat => ((90 - lat) / (90 - MIN_LAT)) * R)
    const meridians = Array.from({ length: 12 }, (_, i) => {
      const [x, y] = project(MIN_LAT, i * 30)
      return { x, y }
    })
    return { circles, meridians }
  }, [])

  const visible = trajectories.filter(t => elapsedTime >= t.launchTime)
  const tracks = visible.map(t => {
    const progress = Math.min(1, (elapsedTime - t.launchTime) / Math.max(1, t.impactTime - t.launchTime))
    const head = greatCircle(t.origin, t.target, progress)
    return {
      t,
      progress,
      head: project(head.lat, head.lng),
      origin: project(t.origin.lat, t.origin.lng),
      target: project(t.target.lat, t.target.lng),
      flown: pathFor(t.origin, t.target, 0, progress),
      remaining: pathFor(t.origin, t.target, progress, 1),
      eta: t.impactTime - elapsedTime,
    }
  })

  // Nahe beieinanderliegende Orte zu einer Beschriftung zusammenfassen ("Malmstrom AFB +3")
  const cluster = (points: { name: string; pos: [number, number] }[]) => {
    const groups: { name: string; pos: [number, number]; extra: number }[] = []
    const seen = new Set<string>()
    for (const p of points) {
      if (seen.has(p.name)) continue
      seen.add(p.name)
      const near = groups.find(g => Math.hypot(g.pos[0] - p.pos[0], g.pos[1] - p.pos[1]) < 18)
      if (near) near.extra++
      else groups.push({ ...p, extra: 0 })
    }
    return groups
  }
  const targetLabels = cluster(tracks.map(tr => ({ name: shortName(tr.t.target.name), pos: tr.target })))
  const originLabels = cluster(tracks.map(tr => ({ name: shortName(tr.t.origin.name), pos: tr.origin })))

  const nextImpact = tracks.filter(tr => tr.eta > 0).sort((a, b) => a.eta - b.eta)[0]

  // Bomber in Warteschleifen über Kanada
  const bomberOrbits: [number, number][] = flags?.bombersAirborne
    ? [[62, -105], [57, -85], [60, -125]].map(([lat, lng], i) => {
        const angle = (elapsedTime / 8 + i * 2) % (2 * Math.PI)
        const [x, y] = project(lat, lng)
        return [x + 9 * Math.cos(angle), y + 9 * Math.sin(angle)]
      })
    : []

  return (
    <div className="bg-dark-panel border border-gray-700 p-4 h-full flex flex-col">
      <h2 className="text-xl font-bold text-white mb-2 flex items-center flex-shrink-0">
        <span className="mr-2">🌍</span> SENSORLAGE
        <span className="ml-2 text-xs font-normal text-gray-500">(unbestätigt - Sensoren können irren)</span>
      </h2>

      <div className="flex-1 min-h-0 relative">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet" role="img"
          aria-label="Polare Lagekarte mit gemeldeten Flugbahnen">
          <defs>
            <clipPath id="map-clip">
              <circle cx={C} cy={C} r={R} />
            </clipPath>
            <radialGradient id="map-ocean" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0b1a2b" />
              <stop offset="100%" stopColor="#050b14" />
            </radialGradient>
          </defs>

          <circle cx={C} cy={C} r={R} fill="url(#map-ocean)" stroke="#1f3b57" strokeWidth={1.5} />

          <g clipPath="url(#map-clip)">
            {graticule.circles.map(r => (
              <circle key={r} cx={C} cy={C} r={r} fill="none" stroke="#12304a" strokeWidth={0.6} strokeDasharray="2 3" />
            ))}
            {graticule.meridians.map((m, i) => (
              <line key={i} x1={C} y1={C} x2={m.x} y2={m.y} stroke="#12304a" strokeWidth={0.6} strokeDasharray="2 3" />
            ))}
            {landPaths.map((d, i) => (
              <path key={i} d={d} fill="#1b2a1f" stroke="#3f6b4a" strokeWidth={0.7} strokeLinejoin="round" />
            ))}

            {/* Flugbahnen */}
            {tracks.map(tr => (
              <g key={tr.t.id}>
                <path d={tr.remaining} fill="none" stroke="#dc2626" strokeOpacity={0.35} strokeWidth={0.9} strokeDasharray="3 3" />
                <path d={tr.flown} fill="none" stroke="#f87171" strokeWidth={1.4} />
                {tr.progress < 1 ? (
                  <circle cx={tr.head[0]} cy={tr.head[1]} r={2.6} fill="#fecaca">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
                  </circle>
                ) : (
                  <circle cx={tr.target[0]} cy={tr.target[1]} r={4} fill="none" stroke="#fbbf24" strokeWidth={1.5}>
                    <animate attributeName="r" values="3;12;3" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            ))}

            {/* Eigene Bomber */}
            {bomberOrbits.map(([x, y], i) => (
              <path key={i} d={`M${x},${y - 3}L${x + 2.5},${y + 2.5}L${x - 2.5},${y + 2.5}Z`} fill="#60a5fa" />
            ))}
          </g>

          {/* Startorte */}
          {tracks.map(tr => (
            <rect key={`o-${tr.t.id}`} x={tr.origin[0] - 2.5} y={tr.origin[1] - 2.5} width={5} height={5} fill="#dc2626"
              transform={`rotate(45 ${tr.origin[0]} ${tr.origin[1]})`} />
          ))}
          {originLabels.map(({ name, pos: [x, y], extra }) => (
            <text key={`ol-${name}`} x={x + 5} y={y - 4} fill="#fca5a5" fontSize={8} fontFamily="monospace">
              {name}{extra > 0 ? ` +${extra}` : ''}
            </text>
          ))}

          {/* Ziele */}
          {tracks.map(tr => (
            <circle key={`t-${tr.t.id}`} cx={tr.target[0]} cy={tr.target[1]} r={3} fill="none" stroke="#f87171" strokeWidth={1} />
          ))}
          {targetLabels.map(({ name, pos: [x, y], extra }) => (
            <text key={`tl-${name}`} x={x + 5} y={y + 10} fill="#e5e7eb" fontSize={7} fontFamily="monospace">
              {name}{extra > 0 ? ` +${extra}` : ''}
            </text>
          ))}

          {trajectories.length > 0 && tracks.length === 0 && (
            <text x={C} y={C} textAnchor="middle" fill="#6b7280" fontSize={10}>Keine Spuren erfasst</text>
          )}
        </svg>

        {flags?.bombersAirborne && (
          <div className="absolute top-1 left-1 text-[10px] text-blue-400">▲ Bomber in Warteschleife</div>
        )}
      </div>

      <div className="flex-shrink-0 mt-2 text-xs border-t border-gray-700 pt-2 grid grid-cols-2 gap-2">
        <div>
          <div className="text-gray-500">Gemeldete Flugbahnen</div>
          <div className={`font-bold ${tracks.length ? 'text-threat-red' : 'text-gray-400'}`}>{tracks.length}</div>
        </div>
        <div>
          <div className="text-gray-500">Nächster Einschlag (berechnet)</div>
          <div className="font-bold font-mono text-threat-red">
            {nextImpact ? `${formatEta(nextImpact.eta)} · ${shortName(nextImpact.t.target.name)}` : '-'}
          </div>
        </div>
      </div>
    </div>
  )
}
