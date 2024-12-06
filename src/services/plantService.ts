import { supabase } from '../lib/supabase'
import type { Plant } from '../types/plant'

export const plantService = {
  async getPlants() {
    const { data: user } = await supabase.auth.getUser()
    if (!user.user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('plants')
      .select('*')
      .eq('user_id', user.user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Plant[]
  },

  async addPlant({ name, species, wateringInterval }: {
    name: string
    species?: string
    wateringInterval?: number
  }) {
    const { data: user } = await supabase.auth.getUser()
    if (!user.user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('plants')
      .insert([{
        name,
        species,
        watering_interval: wateringInterval ?? 7,
        user_id: user.user.id
      }])
      .select()
      .single()

    if (error) throw error
    return data as Plant
  },

  async updatePlant(id: string, updates: Partial<Plant>) {
    const { data: user } = await supabase.auth.getUser()
    if (!user.user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('plants')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.user.id)
      .select()
      .single()

    if (error) throw error
    return data as Plant
  },

  async deletePlant(id: string) {
    const { data: user } = await supabase.auth.getUser()
    if (!user.user) throw new Error('Not authenticated')

    const { error } = await supabase
      .from('plants')
      .delete()
      .eq('id', id)
      .eq('user_id', user.user.id)

    if (error) throw error
  }
}