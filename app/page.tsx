"use client"

import { SearchBar } from "@/components/search-bar"
import { WeatherDashboard } from "@/components/weather-dashboard"
import { WeatherBackground } from "@/components/weather-background"
import { PopularCities } from "@/components/popular-cities"
import { useWeather } from "@/contexts/weather-context"
import { AlertCircle } from "lucide-react"

export default function HomePage() {
  const { currentWeather, error, clearError } = useWeather()

  return (
    <WeatherBackground>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">SkyLens</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">Interactive Weather Forecast Platform</p>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Discover real-time weather forecasts for cities worldwide with dynamic backgrounds and detailed analytics
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <SearchBar />
        </div>

        {!currentWeather && <PopularCities />}

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg p-4 flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0" />
              <p className="text-white">{error}</p>
              <button onClick={clearError} className="ml-auto text-red-300 hover:text-white">
                ×
              </button>
            </div>
          </div>
        )}

        {/* Weather Dashboard */}
        {currentWeather && <WeatherDashboard />}

        {/* Welcome Message */}
        {!currentWeather && !error && (
          <div className="text-center text-white/80 max-w-2xl mx-auto mt-12">
            <h2 className="text-2xl font-semibold mb-4">Welcome to SkyLens</h2>
            <p className="text-lg mb-6">
              Start by searching for any city to see its current weather conditions and 5-day forecast.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-2">Real-time Data</h3>
                <p>Get accurate weather information from OpenWeatherMap API</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-2">Dynamic Backgrounds</h3>
                <p>Experience weather conditions with adaptive visual themes</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-2">Detailed Forecasts</h3>
                <p>View hourly and 5-day forecasts with comprehensive data</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </WeatherBackground>
  )
}
