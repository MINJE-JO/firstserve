import { Racket } from '@/types/racket'

interface SpecComparisonTableProps {
  rackets: Racket[]
}

export const SpecComparisonTable: React.FC<SpecComparisonTableProps> = ({ rackets }) => {
  const specs = [
    { key: 'weight', label: '무게 (g)' },
    { key: 'balance', label: '밸런스 (mm)' },
    { key: 'swingweight', label: '스윙웨이트' },
    { key: 'stiffness', label: '강성' },
    { key: 'power', label: '파워' },
    { key: 'control', label: '컨트롤' },
    { key: 'spin', label: '스핀' },
    { key: 'stability', label: '안정성' },
    { key: 'comfort', label: '편안함' },
    { key: 'maneuverability', label: '조작성' },
  ]

  return (
    <table className="w-full mt-8 border-collapse">
      <thead>
        <tr>
          <th className="border p-2">스펙</th>
          {rackets.map(racket => (
            <th key={racket.id} className="border p-2">{racket.brand} {racket.model}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {specs.map(spec => (
          <tr key={spec.key}>
            <td className="border p-2 font-semibold">{spec.label}</td>
            {rackets.map(racket => (
              <td key={racket.id} className="border p-2 text-center">
                {racket[spec.key as keyof Racket]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}