"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWeather } from "@/contexts/weather-context"

interface CitySuggestion {
  name: string
  country: string
  state?: string
}

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const { searchCity, isLoading } = useWeather()
  const searchRef = useRef<HTMLDivElement>(null)

  const API_KEY = "5a14c0a5b791346b9bc7f11bfc052419"

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([])
        setShowSuggestions(false)
        return
      }

      setIsLoadingSuggestions(true)
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`,
        )

        if (response.ok) {
          const data = await response.json()
          const formattedSuggestions = data.map((item: any) => ({
            name: item.name,
            country: item.country,
            state: item.state,
          }))
          setSuggestions(formattedSuggestions)
          setShowSuggestions(true)
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error)
      } finally {
        setIsLoadingSuggestions(false)
      }
    }

    const debounceTimer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleSearch = async (cityName?: string) => {
    const searchQuery = cityName || query
    if (searchQuery.trim()) {
      await searchCity(searchQuery.trim())
      setQuery("")
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: CitySuggestion) => {
    const cityName = suggestion.state
      ? `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`
      : `${suggestion.name}, ${suggestion.country}`
    handleSearch(cityName)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for a city (e.g., London, New York, Tokyo)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-12 pr-20 h-14 text-lg bg-white/90 backdrop-blur-sm border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-lg"
          disabled={isLoading}
          aria-label="City search input"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Button
          onClick={() => handleSearch()}
          disabled={isLoading || !query.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          {isLoading ? <div className="loading-spinner w-4 h-4" /> : "Search"}
        </Button>
      </div>

      {showSuggestions && (suggestions.length > 0 || isLoadingSuggestions) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-60 overflow-y-auto">
          {isLoadingSuggestions ? (
            <div className="p-4 text-center text-gray-500">
              <div className="loading-spinner w-5 h-5 mx-auto mb-2" />
              Loading suggestions...
            </div>
          ) : (
            suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0 transition-colors"
              >
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">{suggestion.name}</div>
                  <div className="text-sm text-gray-500">
                    {suggestion.state ? `${suggestion.state}, ` : ""}
                    {suggestion.country}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
