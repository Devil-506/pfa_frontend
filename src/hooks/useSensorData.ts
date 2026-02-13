import { useQuery } from '@tanstack/react-query'
import api from '../services/api'
import { SensorWindow, DailyStats, TrendData } from '../types'

export const useLatestSensorWindow = () => {
  return useQuery({
    queryKey: ['latestWindow'],
    queryFn: async () => {
      const { data } = await api.get<SensorWindow>('/sensor/latest')
      return data
    },
    refetchInterval: 5000,
  })
}

export const useDailyStats = (date?: string) => {
  return useQuery({
    queryKey: ['dailyStats', date],
    queryFn: async () => {
      const { data } = await api.get<DailyStats>('/stats/daily', {
        params: { date },
      })
      return data
    },
  })
}

export const useTrendData = (days: number = 7) => {
  return useQuery({
    queryKey: ['trend', days],
    queryFn: async () => {
      const { data } = await api.get<TrendData>(`/stats/trend/${days}`)
      return data
    },
  })
}