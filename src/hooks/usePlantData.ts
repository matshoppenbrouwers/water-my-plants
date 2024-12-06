import { useState, useEffect } from 'react'

export interface Plant {
  id: string
  name: string
  lastWatered: number
}

export function usePlantData() {
  const [plants, setPlants] = useState<Plant[]>(() => {
    const savedPlants = localStorage.getItem('hobbitPlants')
    return savedPlants ? JSON.parse(savedPlants) : []
  })

  useEffect(() => {
    localStorage.setItem('hobbitPlants', JSON.stringify(plants))
  }, [plants])

  const addPlant = (name: string) => {
    setPlants([...plants, { id: Date.now().toString(), name, lastWatered: Date.now() }])
  }

  const waterPlant = (id: string) => {
    setPlants(plants.map(plant => 
      plant.id === id ? { ...plant, lastWatered: Date.now() } : plant
    ))
  }

  const removePlant = (id: string) => {
    setPlants(plants.filter(plant => plant.id !== id))
  }

  return { plants, addPlant, waterPlant, removePlant }
} 