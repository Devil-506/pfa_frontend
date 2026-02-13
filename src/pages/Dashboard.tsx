import React, { useState, useEffect } from 'react'
import { RiskGauge } from '../components/Dashboard/RiskGauge'
import { TrajectoryVisualization } from '../components/Dashboard/TrajectoryVisualization'
import { TrendChart } from '../components/Dashboard/TrendChart'
import { AlertPanel } from '../components/Dashboard/AlertPanel'
import { useWebSocket } from '../hooks/useWebSocket'
import { useLatestSensorWindow, useDailyStats } from '../hooks/useSensorData'
import { simulatePosition } from '../utils/floorplanHelpers'
import { Position } from '../types'
import api from '../services/api'

export const Dashboard: React.FC = () => {
  const token = localStorage.getItem('access_token')
  const { alerts, currentRisk } = useWebSocket(token)
  const { data: latestWindow, isLoading } = useLatestSensorWindow()
  const { data: dailyStats } = useDailyStats()

  const [position, setPosition] = useState<Position>({
    x: 200,
    y: 150,
    timestamp: new Date().toISOString(),
    risk: 0,
  })
  const [trail, setTrail] = useState<Position[]>([])

  // Update position based on latest sensor data
  useEffect(() => {
    if (latestWindow?.features) {
      setPosition((prev) => {
        const newPos = simulatePosition(
          prev,
          latestWindow.features.stepFrequency,
          latestWindow.features.directionChangeRate
        )
        newPos.risk = latestWindow.riskScore
        newPos.timestamp = latestWindow.timestamp
        return newPos
      })

      setTrail((prev) => {
        const newTrail = [...prev, position]
        if (newTrail.length > 30) newTrail.shift()
        return newTrail
      })
    }
  }, [latestWindow])

  const handleAcknowledgeAlert = async (alertId: number) => {
    try {
      await api.post(`/alerts/${alertId}/acknowledge`)
      // Optimistically update UI
    } catch (error) {
      console.error('Failed to acknowledge alert', error)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Good {getGreeting()}, Caregiver</h1>
        <p className="text-gray-600 mt-1">
          {currentRisk < 30
            ? 'Jean is doing well. Here’s her current status.'
            : 'Jean needs attention. Please review the alerts.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex justify-center">
            <RiskGauge risk={currentRisk} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Today’s Activity</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Steps</span>
                <span className="font-mono">{dailyStats?.steps ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Falls</span>
                <span className="font-mono text-red-600">{dailyStats?.falls ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg. Risk</span>
                <span className="font-mono">{dailyStats?.avgRisk.toFixed(0) ?? 0}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Movement Trajectory Analysis</h3>
            <TrajectoryVisualization position={position} trail={trail} risk={currentRisk} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <TrendChart data={latestWindow ? [latestWindow] : []} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <AlertPanel alerts={alerts} onAcknowledge={handleAcknowledgeAlert} />
        </div>
      </div>
    </div>
  )
}

const getGreeting = (): string => {
  const hour = new Date().getHours()
  if (hour < 12) return 'morning'
  if (hour < 18) return 'afternoon'
  return 'evening'
}