import { io, Socket } from 'socket.io-client'
import { Alert } from '../types'

class WebSocketService {
  private socket: Socket | null = null

  connect(token: string): Socket {
    if (this.socket) return this.socket

    this.socket = io(import.meta.env.VITE_WS_URL || '/', {
      path: '/api/v1/sensor/ws',
      transports: ['websocket'],
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    this.socket.on('connect', () => {
      console.log('WebSocket connected')
    })

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected')
    })

    return this.socket
  }

  disconnect(): void {
    this.socket?.disconnect()
    this.socket = null
  }

  onAlert(callback: (alert: Alert) => void): void {
    this.socket?.on('alert', callback)
  }

  onRiskUpdate(callback: (risk: number) => void): void {
    this.socket?.on('riskUpdate', callback)
  }

  off(event: string): void {
    this.socket?.off(event)
  }
}

export const wsService = new WebSocketService()