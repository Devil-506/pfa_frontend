import React, { useRef, useEffect, useState } from 'react'
import { ROOMS, getCurrentRoom, getRiskColor } from '../../utils/floorplanHelpers'
import { Position, Room } from '../../types'

interface FloorplanProps {
  position: Position
  trail: Position[]
  risk: number
  width?: number
  height?: number
}

export const Floorplan: React.FC<FloorplanProps> = ({
  position,
  trail,
  risk,
  width = 600,
  height = 500,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const currentRoom = getCurrentRoom(position)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear
    ctx.clearRect(0, 0, width, height)

    // Draw rooms
    ROOMS.forEach((room) => {
      ctx.fillStyle = room.color
      ctx.strokeStyle = '#94a3b8'
      ctx.lineWidth = 1
      ctx.fillRect(room.bounds.x, room.bounds.y, room.bounds.width, room.bounds.height)
      ctx.strokeRect(room.bounds.x, room.bounds.y, room.bounds.width, room.bounds.height)

      ctx.font = '12px Inter, sans-serif'
      ctx.fillStyle = '#334155'
      ctx.fillText(room.name, room.bounds.x + 8, room.bounds.y + 20)
    })

    // Draw trail
    trail.forEach((pos, idx) => {
      const opacity = (idx + 1) / trail.length * 0.5
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(14, 165, 233, ${opacity})`
      ctx.fill()
    })

    // Draw current position
    ctx.shadowBlur = 12
    ctx.shadowColor = getRiskColor(risk)
    ctx.beginPath()
    ctx.arc(position.x, position.y, 10, 0, Math.PI * 2)
    ctx.fillStyle = getRiskColor(risk)
    ctx.fill()
    ctx.shadowBlur = 0

    // Pulse if high risk
    if (risk > 60) {
      ctx.beginPath()
      ctx.arc(position.x, position.y, 18, 0, Math.PI * 2)
      ctx.fillStyle = `${getRiskColor(risk)}33`
      ctx.fill()
    }
  }, [position, trail, risk, width, height])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    const scaleX = canvasRef.current!.width / rect.width
    const scaleY = canvasRef.current!.height / rect.height
    const canvasX = (e.clientX - rect.left) * scaleX
    const canvasY = (e.clientY - rect.top) * scaleY

    const room = ROOMS.find(
      (r) =>
        canvasX >= r.bounds.x &&
        canvasX <= r.bounds.x + r.bounds.width &&
        canvasY >= r.bounds.y &&
        canvasY <= r.bounds.y + r.bounds.height
    )
    setSelectedRoom(room || null)
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onClick={handleCanvasClick}
        className="border border-gray-200 rounded-lg shadow-md w-full h-auto"
      />
      {selectedRoom && (
        <div className="absolute bottom-2 left-2 bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-100">
          <p className="font-medium">{selectedRoom.name}</p>
          <p className="text-xs text-gray-500">Click for details</p>
        </div>
      )}
      {currentRoom && !selectedRoom && (
        <div className="absolute top-2 right-2 bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-100">
          <p className="text-sm font-medium text-gray-700">Current: {currentRoom.name}</p>
        </div>
      )}
    </div>
  )
}