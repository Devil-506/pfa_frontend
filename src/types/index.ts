export interface User {
  id: number
  email: string
  fullName: string
  role: 'caregiver' | 'admin'
}

export interface IMUFeatures {
  accMagMean: number
  accMagStd: number
  stepFrequency: number
  movementRadius: number
  directionChangeRate: number
  activityLevel: number
  hourOfDay: number
  heartRate?: number
}

export interface SensorWindow {
  id: number
  timestamp: string
  riskScore: number
  isAnomaly: boolean
  features: IMUFeatures
}

export interface Alert {
  id: number
  timestamp: string
  riskScore: number
  alertType: 'fall' | 'wandering' | 'inactivity' | 'elevated_risk' | 'critical_risk'
  message: string
  acknowledged: boolean
  acknowledgedAt?: string
}

export interface DailyStats {
  steps: number
  falls: number
  avgRisk: number
  avgRadius: number
  date: string
}

export interface TrendData {
  dailyAvgRisk: Record<string, number>
  trend: 'improving' | 'stable' | 'deteriorating' | 'insufficient_data'
  slope: number
}

export interface Position {
  x: number
  y: number
  timestamp: string
  risk: number
}

export interface Room {
  id: string
  name: string
  bounds: { x: number; y: number; width: number; height: number }
  color: string
}