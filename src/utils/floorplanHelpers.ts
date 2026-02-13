import { Position, Room } from '../types'

export const ROOMS: Room[] = [
  {
    id: 'living',
    name: 'Living Room',
    bounds: { x: 50, y: 50, width: 200, height: 150 },
    color: '#fef3c7',
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    bounds: { x: 300, y: 50, width: 180, height: 150 },
    color: '#fee2e2',
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    bounds: { x: 50, y: 250, width: 200, height: 150 },
    color: '#dbeafe',
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    bounds: { x: 300, y: 250, width: 100, height: 100 },
    color: '#dcfce7',
  },
  {
    id: 'hallway',
    name: 'Hallway',
    bounds: { x: 200, y: 200, width: 100, height: 60 },
    color: '#f3e8ff',
  },
]

export const getCurrentRoom = (position: Position): Room | null => {
  return ROOMS.find(
    (room) =>
      position.x >= room.bounds.x &&
      position.x <= room.bounds.x + room.bounds.width &&
      position.y >= room.bounds.y &&
      position.y <= room.bounds.y + room.bounds.height
  ) || null
}

export const getRiskColor = (risk: number): string => {
  if (risk < 30) return '#22c55e'
  if (risk < 60) return '#eab308'
  if (risk < 80) return '#ef4444'
  return '#7f1d1d'
}

export const getRiskLevel = (risk: number): 'low' | 'medium' | 'high' | 'critical' => {
  if (risk < 30) return 'low'
  if (risk < 60) return 'medium'
  if (risk < 80) return 'high'
  return 'critical'
}

export const simulatePosition = (
  currentPosition: Position,
  stepFrequency: number,
  directionChangeRate: number
): Position => {
  const speed = Math.max(0.5, Math.min(stepFrequency * 0.1, 3))
  const directionChange = directionChangeRate * Math.PI * 2
  
  const angle = Math.random() * directionChange
  const dx = Math.cos(angle) * speed
  const dy = Math.sin(angle) * speed
  
  let newX = currentPosition.x + dx
  let newY = currentPosition.y + dy
  
  // Keep within reasonable bounds (0-500)
  newX = Math.max(10, Math.min(490, newX))
  newY = Math.max(10, Math.min(390, newY))
  
  return {
    x: newX,
    y: newY,
    timestamp: new Date().toISOString(),
    risk: currentPosition.risk,
  }
}