"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useWeather } from "@/contexts/weather-context"
import { MapPin } from "lucide-react"

interface CityWeather {
  city: string
  country: string
  temp: number
  weather: string
  icon: string
  loading: boolean
}

const popularCities = [
  "London, GB",
  "New York, US",
  "Tokyo, JP",
  "Cairo, EG",
  "Paris, FR",
  "Dubai, AE",
  "Sydney, AU",
  "Berlin, DE",
]

export function PopularCities() {
  const [citiesWeather, setCitiesWeather] = useState<CityWeather[]>([])
  const { searchCity, tempUnit } = useWeather()

  const API_KEY = "5a14c0a5b791346b9bc7f11bfc052419"

  const convertTemp = (temp: number) => {
    if (tempUnit === "F") {
      return Math.round((temp * 9) / 5 + 32)
    }
    return Math.round(temp)
  }

  useEffect(() => {
    const fetchCitiesWeather = async () => {
      const initialCities = popularCities.map((city) => ({
        city,
        country: city.split(", ")[1],
        temp: 0,
        weather: "",
        icon: "",
        loading: true,
      }))

      setCitiesWeather(initialCities)

      for (let i = 0; i < popularCities.length; i++) {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(popularCities[i])}&appid=${API_KEY}&units=metric`,
          )

          if (response.ok) {
            const data = await response.json()
            setCitiesWeather((prev) =>
              prev.map((item, index) =>
                index === i
                  ? {
                      ...item,
                      temp: data.main.temp,
                      weather: data.weather[0].main,
                      icon: data.weather[0].icon,
                      loading: false,
                    }
                  : item,
              ),
            )
          }
        } catch (error) {
          console.error(`Error fetching weather for ${popularCities[i]}:`, error)
        }
      }
    }

    fetchCitiesWeather()
  }, [tempUnit])

  const handleCityClick = (city: string) => {
    searchCity(city)
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-semibold text-white mb-4 text-center">Popular Cities</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {citiesWeather.map((city, index) => (
          <Card
            key={index}
            className="bg-white/20 backdrop-blur-sm border-white/30 cursor-pointer hover:bg-white/30 transition-all"
            onClick={() => handleCityClick(city.city)}
          >
            <CardContent className="p-4">
              {city.loading ? (
                <div className="flex justify-center items-center h-24">
                  <div className="loading-spinner w-5 h-5" />
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-white/70" />
                    <h3 className="font-medium text-white">{city.city.split(", ")[0]}</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {convertTemp(city.temp)}°{tempUnit}
                      </p>
                      <p className="text-sm text-white/80">{city.weather}</p>
                    </div>
                    <img
                      src={`https://openweathermap.org/img/wn/${city.icon}.png`}
                      alt={city.weather}
                      className="w-12 h-12"
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
