import React, { useRef, useEffect, useState } from 'react'
import { Position } from '../../types'

interface TrajectoryVisualizationProps {
  position: Position
  trail: Position[]
  risk: number
  width?: number
  height?: number
}

export const TrajectoryVisualization: React.FC<TrajectoryVisualizationProps> = ({
  position,
  trail,
  risk,
  width = 600,
  height = 500,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredPoint, setHoveredPoint] = useState<Position | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1
    for (let i = 0; i <= width; i += 50) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height)
      ctx.stroke()
    }
    for (let i = 0; i <= height; i += 50) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(width, i)
      ctx.stroke()
    }

    // Draw trajectory lines
    if (trail.length > 1) {
      ctx.strokeStyle = '#3b82f6'
      ctx.lineWidth = 2
      ctx.globalAlpha = 0.6
      
      for (let i = 1; i < trail.length; i++) {
        const prev = trail[i - 1]
        const curr = trail[i]
        
        ctx.beginPath()
        ctx.moveTo(prev.x, prev.y)
        ctx.lineTo(curr.x, curr.y)
        ctx.stroke()
      }
      
      ctx.globalAlpha = 1
    }

    // Draw trajectory points with risk coloring
    trail.forEach((pos, idx) => {
      const opacity = (idx + 1) / trail.length * 0.8
      const radius = 3 + (pos.risk / 100) * 3 // Size based on risk
      
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
      ctx.fillStyle = getRiskColorWithOpacity(pos.risk, opacity)
      ctx.fill()
      
      // Add abnormality indicator for high risk
      if (pos.risk > 70) {
        ctx.strokeStyle = '#ef4444'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, radius + 3, 0, Math.PI * 2)
        ctx.stroke()
      }
    })

    // Draw current position with pulsing effect if high risk
    const currentRadius = 8 + (risk / 100) * 4
    ctx.shadowBlur = risk > 60 ? 20 : 10
    ctx.shadowColor = getRiskColor(risk)
    
    ctx.beginPath()
    ctx.arc(position.x, position.y, currentRadius, 0, Math.PI * 2)
    ctx.fillStyle = getRiskColor(risk)
    ctx.fill()
    
    // Draw risk value at current position
    ctx.shadowBlur = 0
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 10px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(Math.round(risk).toString(), position.x, position.y)

    // Draw fall risk scale
    drawRiskScale(ctx, width)
    
    // Draw abnormality indicator
    if (risk > 70) {
      drawAbnormalityIndicator(ctx, width)
    }
  }, [position, trail, risk, width, height])

  const drawRiskScale = (ctx: CanvasRenderingContext2D, width: number) => {
    const scaleWidth = 200
    const scaleHeight = 20
    const x = width - scaleWidth - 20
    const y = 20

    // Background
    ctx.fillStyle = '#f3f4f6'
    ctx.fillRect(x, y, scaleWidth, scaleHeight)

    // Gradient based on risk
    const gradient = ctx.createLinearGradient(x, y, x + scaleWidth, y)
    gradient.addColorStop(0, '#22c55e')
    gradient.addColorStop(0.3, '#eab308')
    gradient.addColorStop(0.6, '#ef4444')
    gradient.addColorStop(1, '#7f1d1d')
    
    ctx.fillStyle = gradient
    ctx.fillRect(x, y, scaleWidth, scaleHeight)

    // Current risk indicator
    const riskX = x + (risk / 100) * scaleWidth
    ctx.fillStyle = '#1f2937'
    ctx.beginPath()
    ctx.moveTo(riskX, y - 5)
    ctx.lineTo(riskX - 5, y - 10)
    ctx.lineTo(riskX + 5, y - 10)
    ctx.closePath()
    ctx.fill()

    // Labels
    ctx.fillStyle = '#6b7280'
    ctx.font = '10px Inter, sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText('0', x - 15, y + 15)
    ctx.textAlign = 'right'
    ctx.fillText('100', x + scaleWidth + 15, y + 15)
    ctx.textAlign = 'center'
    ctx.fillText('Fall Risk', x + scaleWidth / 2, y - 15)
  }

  const drawAbnormalityIndicator = (ctx: CanvasRenderingContext2D, width: number) => {
    const x = width - 20
    const y = 60

    // Warning triangle
    ctx.fillStyle = '#ef4444'
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x - 15, y + 25)
    ctx.lineTo(x + 15, y + 25)
    ctx.closePath()
    ctx.fill()

    // Exclamation mark
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 16px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('!', x, y + 12)

    // Label
    ctx.fillStyle = '#ef4444'
    ctx.font = '12px Inter, sans-serif'
    ctx.fillText('Abnormal', x, y + 35)
  }

  const getRiskColorWithOpacity = (risk: number, opacity: number): string => {
    const color = getRiskColor(risk)
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  const getRiskColor = (risk: number): string => {
    if (risk < 30) return '#22c55e'
    if (risk < 60) return '#eab308'
    if (risk < 80) return '#ef4444'
    return '#7f1d1d'
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    const scaleX = canvasRef.current!.width / rect.width
    const scaleY = canvasRef.current!.height / rect.height
    const canvasX = (e.clientX - rect.left) * scaleX
    const canvasY = (e.clientY - rect.top) * scaleY

    // Find nearest trail point
    let nearestPoint: Position | null = null
    let minDistance = 20 // Maximum click distance

    trail.forEach((pos) => {
      const distance = Math.sqrt(Math.pow(pos.x - canvasX, 2) + Math.pow(pos.y - canvasY, 2))
      if (distance < minDistance) {
        minDistance = distance
        nearestPoint = pos
      }
    })

    setHoveredPoint(nearestPoint)
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onClick={handleCanvasClick}
        className="border border-gray-200 rounded-lg shadow-md w-full h-auto cursor-crosshair"
      />
      
      {/* Risk Level Badge */}
      <div className="absolute top-2 left-2 bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-100">
        <p className="text-sm font-medium text-gray-700">Risk Level</p>
        <p className={`text-lg font-bold ${getRiskTextColor(risk)}`}>
          {Math.round(risk)}/100
        </p>
      </div>

      {/* Movement Stats */}
      <div className="absolute bottom-2 left-2 bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-100">
        <p className="text-sm font-medium text-gray-700">Movement</p>
        <p className="text-xs text-gray-500">
          {trail.length > 1 ? 
            `${Math.round(calculateTotalDistance(trail))} units traveled` : 
            'Tracking movement...'
          }
        </p>
      </div>

      {/* Hovered Point Details */}
      {hoveredPoint && (
        <div className="absolute top-2 right-2 bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-100">
          <p className="text-xs font-medium text-gray-700">Point Details</p>
          <p className="text-xs text-gray-500">Risk: {Math.round(hoveredPoint.risk)}</p>
          <p className="text-xs text-gray-500">
            {new Date(hoveredPoint.timestamp).toLocaleTimeString()}
          </p>
        </div>
      )}

      {/* Abnormality Warning */}
      {risk > 70 && (
        <div className="absolute top-20 left-2 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
          <p className="text-sm font-medium text-red-700">⚠️ Abnormal Movement Detected</p>
          <p className="text-xs text-red-600">Risk: {Math.round(risk)}/100</p>
        </div>
      )}
    </div>
  )
}

const getRiskTextColor = (risk: number): string => {
  if (risk < 30) return 'text-green-600'
  if (risk < 60) return 'text-yellow-600'
  if (risk < 80) return 'text-red-600'
  return 'text-red-800'
}

const calculateTotalDistance = (trail: Position[]): number => {
  let totalDistance = 0
  for (let i = 1; i < trail.length; i++) {
    const prev = trail[i - 1]
    const curr = trail[i]
    totalDistance += Math.sqrt(Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2))
  }
  return totalDistance
}
