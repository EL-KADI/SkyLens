"use client"

import { WeatherBackground } from "@/components/weather-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cloud, Database, Smartphone, Zap, Globe } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <WeatherBackground>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">About SkyLens</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Your comprehensive weather companion, delivering real-time forecasts with stunning visual experiences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Features */}
          <Card className="bg-white/20 backdrop-blur-sm border-white/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Zap className="w-6 h-6 text-yellow-400" />
                <span>Key Features</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="flex items-start space-x-3">
                <Cloud className="w-5 h-5 text-blue-300 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Real-time Weather Data</h3>
                  <p className="text-white/80 text-sm">Accurate forecasts powered by OpenWeatherMap API</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Smartphone className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Responsive Design</h3>
                  <p className="text-white/80 text-sm">Optimized for desktop, tablet, and mobile devices</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Globe className="w-5 h-5 text-purple-300 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Global Coverage</h3>
                  <p className="text-white/80 text-sm">Weather data for cities worldwide with autocomplete search</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technology */}
          <Card className="bg-white/20 backdrop-blur-sm border-white/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Database className="w-6 h-6 text-blue-400" />
                <span>Technology Stack</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Frontend</h3>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• Next.js 14 with App Router</li>
                  <li>• React 18 with TypeScript</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Recharts for data visualization</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">API Integration</h3>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• OpenWeatherMap API</li>
                  <li>• Geocoding for city search</li>
                  <li>• 5-day weather forecasts</li>
                  <li>• Hourly weather data</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Features</h3>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• Dynamic weather backgrounds</li>
                  <li>• Local storage for favorites</li>
                  <li>• Responsive design patterns</li>
                  <li>• Accessibility optimized</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Source */}
        <Card className="bg-white/20 backdrop-blur-sm border-white/30 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-center">Data Source & Accuracy</CardTitle>
          </CardHeader>
          <CardContent className="text-white text-center">
            <p className="mb-4">
              SkyLens uses the OpenWeatherMap API to provide accurate and up-to-date weather information. Our data
              includes current conditions, 5-day forecasts, and hourly predictions for over 200,000 cities worldwide.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Current Weather</h3>
                <p className="text-sm text-white/80">Real-time temperature, humidity, wind, and pressure data</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">5-Day Forecast</h3>
                <p className="text-sm text-white/80">Daily high/low temperatures and weather conditions</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Hourly Data</h3>
                <p className="text-sm text-white/80">24-hour detailed weather predictions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Explore?</h2>
          <p className="text-white/80 mb-6">Start discovering weather conditions around the world with SkyLens</p>
          <div className="space-x-4">
            <Link href="/">
              <Button className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 px-8 py-3">
                Start Exploring
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/20 text-center text-white/60">
          <p className="text-sm">Built with ❤️ using Next.js and OpenWeatherMap API</p>
          <p className="text-xs mt-2">Weather data provided by OpenWeatherMap • Updated every 10 minutes</p>
        </div>
      </div>
    </WeatherBackground>
  )
}
