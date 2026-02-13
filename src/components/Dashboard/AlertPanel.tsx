import React from 'react'
import { Alert } from '../../types'
import { relativeTime } from '../../utils/formatDate'
import { motion, AnimatePresence } from 'framer-motion'

interface AlertPanelProps {
  alerts: Alert[]
  onAcknowledge: (id: number) => void
}

export const AlertPanel: React.FC<AlertPanelProps> = ({ alerts, onAcknowledge }) => {
  const unacknowledged = alerts.filter((a) => !a.acknowledged)

  const getAlertStyles = (type: Alert['alertType']) => {
    switch (type) {
      case 'critical_risk':
      case 'fall':
        return 'border-red-500 bg-red-50'
      case 'wandering':
        return 'border-orange-500 bg-orange-50'
      default:
        return 'border-yellow-500 bg-yellow-50'
    }
  }

  const getEmpatheticMessage = (alert: Alert): string => {
    switch (alert.alertType) {
      case 'fall':
        return `Jean may have fallen. Approach calmly and check if she's okay.`
      case 'wandering':
        return `Jean has been pacing for a while. She might be anxious or looking for something.`
      case 'inactivity':
        return `Jean has been inactive for an unusual period. Consider checking on her.`
      case 'elevated_risk':
        return `Movement pattern is unusual. She might need hydration or a bathroom break.`
      case 'critical_risk':
        return `Critical risk level detected. Please attend to Jean immediately.`
      default:
        return alert.message
    }
  }

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Alerts</h3>
        {unacknowledged.length > 0 && (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {unacknowledged.length} new
          </span>
        )}
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className={`p-4 rounded-lg border-l-4 ${getAlertStyles(alert.alertType)}`}
            >
              <div className="flex justify-between">
                <span className="text-sm font-medium capitalize">
                  {alert.alertType.replace('_', ' ')}
                </span>
                <span className="text-xs text-gray-500">{relativeTime(alert.timestamp)}</span>
              </div>
              <p className="text-sm mt-1 text-gray-700">{getEmpatheticMessage(alert)}</p>
              {!alert.acknowledged && (
                <button
                  onClick={() => onAcknowledge(alert.id)}
                  className="mt-2 text-xs bg-white px-3 py-1 rounded-full shadow-sm hover:bg-gray-50"
                >
                  Acknowledge
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}