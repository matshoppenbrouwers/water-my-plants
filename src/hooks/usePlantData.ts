import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export interface Plant {
  id: string
  name: string
  lastWatered: number
}

export function usePlantData() {
  const [plants, setPlants] = useState<Plant[]>([])

  useEffect(() => {
    async function fetchPlants() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('plants')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching plants:', error)
        return
      }

      setPlants(data?.map(plant => ({
        id: plant.id,
        name: plant.name,
        lastWatered: new Date(plant.last_watered).getTime()
      })) || [])
    }

    fetchPlants()
  }, [])

  const addPlant = async (name: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('plants')
      .insert([
        { 
          name, 
          last_watered: new Date().toISOString(),
          user_id: user.id 
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error adding plant:', error)
      return
    }

    const newPlant = {
      id: data.id,
      name: data.name,
      lastWatered: new Date(data.last_watered).getTime()
    }
    setPlants([newPlant, ...plants])
  }

  const waterPlant = async (id: string) => {
    const { error } = await supabase
      .from('plants')
      .update({ last_watered: new Date().toISOString() })
      .eq('id', id)

    if (error) {
      console.error('Error watering plant:', error)
      return
    }

    setPlants(plants.map(plant => 
      plant.id === id ? { ...plant, lastWatered: Date.now() } : plant
    ))
  }

  const removePlant = async (id: string) => {
    const { error } = await supabase
      .from('plants')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error removing plant:', error)
      return
    }

    setPlants(plants.filter(plant => plant.id !== id))
  }

  return { plants, addPlant, waterPlant, removePlant }
} 