"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface WeatherData {
  name: string
  country: string
  temp: number
  feels_like: number
  humidity: number
  pressure: number
  wind_speed: number
  wind_deg: number
  weather: string
  description: string
  icon: string
  sunrise: number
  sunset: number
  coord: {
    lat: number
    lon: number
  }
}

interface ForecastData {
  date: string
  temp_max: number
  temp_min: number
  weather: string
  description: string
  icon: string
  humidity: number
  wind_speed: number
}

interface HourlyData {
  time: string
  temp: number
  weather: string
  icon: string
}

interface WeatherContextType {
  currentWeather: WeatherData | null
  forecast: ForecastData[]
  hourlyForecast: HourlyData[]
  isLoading: boolean
  error: string | null
  tempUnit: "C" | "F"
  searchCity: (city: string) => Promise<void>
  toggleTempUnit: () => void
  clearError: () => void
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

const API_KEY = "5a14c0a5b791346b9bc7f11bfc052419"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastData[]>([])
  const [hourlyForecast, setHourlyForecast] = useState<HourlyData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tempUnit, setTempUnit] = useState<"C" | "F">("C")

  const convertTemp = (temp: number, unit: "C" | "F") => {
    if (unit === "F") {
      return Math.round((temp * 9) / 5 + 32)
    }
    return Math.round(temp)
  }

  const searchCity = async (city: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Get current weather
      const currentResponse = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
      )

      if (!currentResponse.ok) {
        throw new Error("City not found. Please check the spelling and try again.")
      }

      const currentData = await currentResponse.json()

      const weatherData: WeatherData = {
        name: currentData.name,
        country: currentData.sys.country,
        temp: currentData.main.temp,
        feels_like: currentData.main.feels_like,
        humidity: currentData.main.humidity,
        pressure: currentData.main.pressure,
        wind_speed: currentData.wind.speed,
        wind_deg: currentData.wind.deg,
        weather: currentData.weather[0].main,
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        sunrise: currentData.sys.sunrise,
        sunset: currentData.sys.sunset,
        coord: currentData.coord,
      }

      setCurrentWeather(weatherData)

      // Get 5-day forecast
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
      )

      if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json()

        // Process 5-day forecast (one per day at noon)
        const dailyForecast: ForecastData[] = []
        const hourlyData: HourlyData[] = []

        forecastData.list.forEach((item: any, index: number) => {
          const date = new Date(item.dt * 1000)

          // Get hourly data for next 24 hours
          if (index < 8) {
            hourlyData.push({
              time: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
              temp: item.main.temp,
              weather: item.weather[0].main,
              icon: item.weather[0].icon,
            })
          }

          // Get daily forecast (noon data)
          if (item.dt_txt.includes("12:00:00")) {
            dailyForecast.push({
              date: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
              temp_max: item.main.temp_max,
              temp_min: item.main.temp_min,
              weather: item.weather[0].main,
              description: item.weather[0].description,
              icon: item.weather[0].icon,
              humidity: item.main.humidity,
              wind_speed: item.wind.speed,
            })
          }
        })

        setForecast(dailyForecast)
        setHourlyForecast(hourlyData)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching weather data")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTempUnit = () => {
    setTempUnit((prev) => (prev === "C" ? "F" : "C"))
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        forecast,
        hourlyForecast,
        isLoading,
        error,
        tempUnit,
        searchCity,
        toggleTempUnit,
        clearError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}

export function useWeather() {
  const context = useContext(WeatherContext)
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider")
  }
  return context
}
