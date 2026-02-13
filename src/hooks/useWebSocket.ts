import { useEffect, useState } from 'react'
import { wsService } from '../services/websocket'
import { Alert } from '../types'

export const useWebSocket = (token: string | null) => {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [currentRisk, setCurrentRisk] = useState<number>(0)

  useEffect(() => {
    if (!token) return

    wsService.connect(token)

    wsService.onAlert((alert: Alert) => {
      setAlerts((prev) => [alert, ...prev].slice(0, 50))
    })

    wsService.onRiskUpdate((risk: number) => {
      setCurrentRisk(risk)
    })

    return () => {
      wsService.off('alert')
      wsService.off('riskUpdate')
      wsService.disconnect()
    }
  }, [token])

  return { alerts, currentRisk }
}