"use client"

import { Thermometer, Droplets, Wind, Eye, Sunrise, Sunset } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWeather } from "@/contexts/weather-context"
import Link from "next/link"

export function WeatherDashboard() {
  const { currentWeather, forecast, tempUnit, toggleTempUnit } = useWeather()

  if (!currentWeather) return null

  const convertTemp = (temp: number) => {
    if (tempUnit === "F") {
      return Math.round((temp * 9) / 5 + 32)
    }
    return Math.round(temp)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Current Weather Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            {convertTemp(currentWeather.temp)}°{tempUnit}
          </h1>
          <Button
            onClick={toggleTempUnit}
            variant="outline"
            size="sm"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            °{tempUnit === "C" ? "F" : "C"}
          </Button>
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          {currentWeather.name}, {currentWeather.country}
        </h2>

        <p className="text-xl text-white/90 capitalize mb-4">{currentWeather.description}</p>

        <div className="flex justify-center">
          <img
            src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
            alt={currentWeather.description}
            className="w-20 h-20"
          />
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-white/20 backdrop-blur-sm border-white/30 text-white">
          <CardContent className="p-4 text-center">
            <Thermometer className="w-8 h-8 mx-auto mb-2 text-orange-300" />
            <p className="text-sm opacity-80">Feels Like</p>
            <p className="text-xl font-semibold">{convertTemp(currentWeather.feels_like)}°</p>
          </CardContent>
        </Card>

        <Card className="bg-white/20 backdrop-blur-sm border-white/30 text-white">
          <CardContent className="p-4 text-center">
            <Droplets className="w-8 h-8 mx-auto mb-2 text-blue-300" />
            <p className="text-sm opacity-80">Humidity</p>
            <p className="text-xl font-semibold">{currentWeather.humidity}%</p>
          </CardContent>
        </Card>

        <Card className="bg-white/20 backdrop-blur-sm border-white/30 text-white">
          <CardContent className="p-4 text-center">
            <Wind className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm opacity-80">Wind Speed</p>
            <p className="text-xl font-semibold">{Math.round(currentWeather.wind_speed * 3.6)} km/h</p>
          </CardContent>
        </Card>

        <Card className="bg-white/20 backdrop-blur-sm border-white/30 text-white">
          <CardContent className="p-4 text-center">
            <Eye className="w-8 h-8 mx-auto mb-2 text-purple-300" />
            <p className="text-sm opacity-80">Pressure</p>
            <p className="text-xl font-semibold">{currentWeather.pressure} hPa</p>
          </CardContent>
        </Card>
      </div>

      {/* 5-Day Forecast */}
      {forecast.length > 0 && (
        <Card className="bg-white/20 backdrop-blur-sm border-white/30 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-center">5-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {forecast.map((day, index) => (
                <div key={index} className="text-center text-white">
                  <p className="font-semibold mb-2">{day.date}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                    alt={day.description}
                    className="w-12 h-12 mx-auto mb-2"
                  />
                  <p className="text-sm capitalize mb-1">{day.weather}</p>
                  <div className="space-y-1">
                    <p className="font-semibold">{convertTemp(day.temp_max)}°</p>
                    <p className="text-sm opacity-80">{convertTemp(day.temp_min)}°</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sun Times */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="bg-white/20 backdrop-blur-sm border-white/30 text-white">
          <CardContent className="p-6 text-center">
            <Sunrise className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
            <p className="text-lg font-semibold">Sunrise</p>
            <p className="text-2xl">
              {new Date(currentWeather.sunrise * 1000).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/20 backdrop-blur-sm border-white/30 text-white">
          <CardContent className="p-6 text-center">
            <Sunset className="w-12 h-12 mx-auto mb-4 text-orange-300" />
            <p className="text-lg font-semibold">Sunset</p>
            <p className="text-2xl">
              {new Date(currentWeather.sunset * 1000).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* View Details Button */}
      <div className="text-center">
        <Link href="/details">
          <Button className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 px-8 py-3 text-lg">
            View Detailed Forecast
          </Button>
        </Link>
      </div>
    </div>
  )
}
