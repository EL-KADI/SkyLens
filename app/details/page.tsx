"use client"

import { useWeather } from "@/contexts/weather-context"
import { WeatherBackground } from "@/components/weather-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Droplets, Wind, Eye, Compass } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function DetailsPage() {
  const { currentWeather, forecast, hourlyForecast, tempUnit } = useWeather()

  if (!currentWeather) {
    return (
      <WeatherBackground>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold mb-4">No Weather Data</h1>
            <p className="mb-6">Please search for a city first to view detailed weather information.</p>
            <Link href="/">
              <Button className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                Go Back to Search
              </Button>
            </Link>
          </div>
        </div>
      </WeatherBackground>
    )
  }

  const convertTemp = (temp: number) => {
    if (tempUnit === "F") {
      return Math.round((temp * 9) / 5 + 32)
    }
    return Math.round(temp)
  }

  const getWindDirection = (degrees: number) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ]
    return directions[Math.round(degrees / 22.5) % 16]
  }

  // Prepare chart data
  const chartData = forecast.map((day) => ({
    date: day.date.split(",")[0], // Get just the day part
    high: convertTemp(day.temp_max),
    low: convertTemp(day.temp_min),
  }))

  return (
    <WeatherBackground>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 mr-4">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Detailed Weather</h1>
            <p className="text-white/80">
              {currentWeather.name}, {currentWeather.country}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Weather Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Weather Card */}
            <Card className="bg-white/20 backdrop-blur-sm border-white/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Current Conditions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-5xl font-bold mb-2">
                      {convertTemp(currentWeather.temp)}°{tempUnit}
                    </div>
                    <div className="text-lg capitalize">{currentWeather.description}</div>
                    <div className="text-sm opacity-80">
                      Feels like {convertTemp(currentWeather.feels_like)}°{tempUnit}
                    </div>
                  </div>
                  <img
                    src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                    alt={currentWeather.description}
                    className="w-32 h-32"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <Droplets className="w-6 h-6 mx-auto mb-2 text-blue-300" />
                    <div className="text-sm opacity-80">Humidity</div>
                    <div className="font-semibold">{currentWeather.humidity}%</div>
                  </div>
                  <div className="text-center">
                    <Wind className="w-6 h-6 mx-auto mb-2 text-gray-300" />
                    <div className="text-sm opacity-80">Wind</div>
                    <div className="font-semibold">{Math.round(currentWeather.wind_speed * 3.6)} km/h</div>
                  </div>
                  <div className="text-center">
                    <Eye className="w-6 h-6 mx-auto mb-2 text-purple-300" />
                    <div className="text-sm opacity-80">Pressure</div>
                    <div className="font-semibold">{currentWeather.pressure} hPa</div>
                  </div>
                  <div className="text-center">
                    <Compass className="w-6 h-6 mx-auto mb-2 text-green-300" />
                    <div className="text-sm opacity-80">Direction</div>
                    <div className="font-semibold">{getWindDirection(currentWeather.wind_deg)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hourly Forecast */}
            {hourlyForecast.length > 0 && (
              <Card className="bg-white/20 backdrop-blur-sm border-white/30">
                <CardHeader>
                  <CardTitle className="text-white">24-Hour Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4 overflow-x-auto pb-4">
                    {hourlyForecast.map((hour, index) => (
                      <div key={index} className="flex-shrink-0 text-center text-white min-w-[80px]">
                        <div className="text-sm mb-2">{hour.time}</div>
                        <img
                          src={`https://openweathermap.org/img/wn/${hour.icon}.png`}
                          alt={hour.weather}
                          className="w-10 h-10 mx-auto mb-2"
                        />
                        <div className="font-semibold">{convertTemp(hour.temp)}°</div>
                        <div className="text-xs opacity-80 capitalize">{hour.weather}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Temperature Trend Chart */}
            {chartData.length > 0 && (
              <Card className="bg-white/20 backdrop-blur-sm border-white/30">
                <CardHeader>
                  <CardTitle className="text-white">5-Day Temperature Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                        <XAxis dataKey="date" stroke="rgba(255,255,255,0.8)" fontSize={12} />
                        <YAxis
                          stroke="rgba(255,255,255,0.8)"
                          fontSize={12}
                          label={{
                            value: `Temperature (°${tempUnit})`,
                            angle: -90,
                            position: "insideLeft",
                            style: { textAnchor: "middle", fill: "rgba(255,255,255,0.8)" },
                          }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            border: "none",
                            borderRadius: "8px",
                            color: "white",
                          }}
                          formatter={(value: any, name: string) => [
                            `${value}°${tempUnit}`,
                            name === "high" ? "High" : "Low",
                          ]}
                        />
                        <Line
                          type="monotone"
                          dataKey="high"
                          stroke="#ef4444"
                          strokeWidth={3}
                          dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="low"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sun Times */}
            <Card className="bg-white/20 backdrop-blur-sm border-white/30">
              <CardHeader>
                <CardTitle className="text-white">Sun Times</CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-4">
                <div className="flex justify-between items-center">
                  <span>Sunrise</span>
                  <span className="font-semibold">
                    {new Date(currentWeather.sunrise * 1000).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sunset</span>
                  <span className="font-semibold">
                    {new Date(currentWeather.sunset * 1000).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Location Map Placeholder */}
            <Card className="bg-white/20 backdrop-blur-sm border-white/30">
              <CardHeader>
                <CardTitle className="text-white">Location</CardTitle>
              </CardHeader>
              <CardContent className="text-white">
                <div className="aspect-square bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-12 h-12 text-white/60" />
                </div>
                <div className="text-center">
                  <div className="font-semibold">{currentWeather.name}</div>
                  <div className="text-sm opacity-80">{currentWeather.country}</div>
                  <div className="text-xs opacity-60 mt-2">
                    {currentWeather.coord.lat.toFixed(2)}°, {currentWeather.coord.lon.toFixed(2)}°
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weather Stats */}
            <Card className="bg-white/20 backdrop-blur-sm border-white/30">
              <CardHeader>
                <CardTitle className="text-white">Weather Statistics</CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-3">
                <div className="flex justify-between">
                  <span>Visibility</span>
                  <span>Good</span>
                </div>
                <div className="flex justify-between">
                  <span>UV Index</span>
                  <span>Moderate</span>
                </div>
                <div className="flex justify-between">
                  <span>Air Quality</span>
                  <span>Good</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </WeatherBackground>
  )
}
