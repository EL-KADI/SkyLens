"use client"

import type React from "react"

import { useWeather } from "@/contexts/weather-context"

export function WeatherBackground({ children }: { children: React.ReactNode }) {
  const { currentWeather } = useWeather()

  const getBackgroundClass = () => {
    if (!currentWeather) return "bg-gradient-to-br from-blue-400 to-blue-600"

    const weather = currentWeather.weather.toLowerCase()

    if (weather.includes("clear") || weather.includes("sun")) {
      return "weather-clear"
    } else if (weather.includes("cloud")) {
      return "weather-clouds"
    } else if (weather.includes("rain") || weather.includes("drizzle")) {
      return "weather-rain rain-animation"
    } else if (weather.includes("snow")) {
      return "weather-snow snow-animation"
    } else if (weather.includes("thunder")) {
      return "weather-thunderstorm"
    } else {
      return "weather-clouds"
    }
  }

  return (
    <div className={`min-h-screen transition-all duration-1000 ${getBackgroundClass()}`}>
      <div className="min-h-screen bg-black/10">{children}</div>
    </div>
  )
}
