import React from 'react'
import { getRiskColor, getRiskLevel } from '../../utils/floorplanHelpers'
import { motion } from 'framer-motion'

interface RiskGaugeProps {
  risk: number
  size?: number
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ risk, size = 180 }) => {
  const fillPercentage = Math.min(100, Math.max(0, risk))
  const color = getRiskColor(risk)
  const level = getRiskLevel(risk)

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative rounded-full bg-gray-100 overflow-hidden shadow-inner"
        style={{ width: size, height: size }}
      >
        {/* Fluid fill */}
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          style={{ backgroundColor: color }}
          initial={{ height: 0 }}
          animate={{ height: `${fillPercentage}%` }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        />
        {/* Risk value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold" style={{ color: risk > 60 ? 'white' : '#1f2937' }}>
            {Math.round(risk)}
          </span>
        </div>
      </div>
      <div className="mt-2 text-center">
        <p className="text-sm text-gray-500">Current Risk</p>
        <p className="text-lg font-semibold capitalize">{level}</p>
      </div>
    </div>
  )
}