import React from 'react'
import ReactApexChart from 'react-apexcharts'

type ChartProps = {
  options: any
  series: any
  type?: React.ComponentProps<typeof ReactApexChart>['type']
  height?: number | string
}

export const Chart: React.FC<ChartProps> = ({ options, series, type = 'line', height = 320 }) => {
  return <ReactApexChart options={options} series={series} type={type} height={height} />
}

export default Chart
