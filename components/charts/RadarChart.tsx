'use client'

import { Racket } from '@/types/racket'
import { Radar } from 'react-chartjs-2'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

interface RadarChartProps {
  rackets: Racket[]
}

export const RadarChart: React.FC<RadarChartProps> = ({ rackets }) => {
  const attributes = ['power', 'control', 'spin', 'stability', 'comfort', 'maneuverability']

  const data = {
    labels: attributes.map(attr => attr.charAt(0).toUpperCase() + attr.slice(1)),
    datasets: rackets.map((racket, index) => ({
      label: `${racket.brand} ${racket.model}`,
      data: attributes.map(attr => racket[attr as keyof Racket] as number),
      backgroundColor: `rgba(${index * 100}, ${255 - index * 50}, ${index * 50}, 0.2)`,
      borderColor: `rgba(${index * 100}, ${255 - index * 50}, ${index * 50}, 1)`,
      borderWidth: 1,
    })),
  }

  const options = {
    scales: {
      r: {
        angleLines: {
          display: false
        },
        suggestedMin: 0,
        suggestedMax: 10
      }
    }
  }

  return <Radar data={data} options={options} />
}