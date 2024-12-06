import { supabase } from './supabase'

export async function testConnection() {
  try {
    const { data, error } = await supabase.from('plants').select('count')
    if (error) throw error
    console.log('Successfully connected to Supabase!')
    console.log('Current user:', await supabase.auth.getUser())
    return true
  } catch (error) {
    console.error('Error connecting to Supabase:', error)
    return false
  }
}

export async function testAddPlant(name: string) {
  try {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) throw new Error('No user logged in')

    const { data, error } = await supabase
      .from('plants')
      .insert([
        {
          name,
          user_id: userData.user.id,
          last_watered: new Date().toISOString(),
          watering_interval: 7
        }
      ])
      .select()
      .single()

    if (error) throw error
    console.log('Successfully added plant:', data)
    return data
  } catch (error) {
    console.error('Error adding plant:', error)
    return null
  }
}