import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface AddPlantFormProps {
  onAddPlant: (name: string) => void
}

export function AddPlantForm({ onAddPlant }: AddPlantFormProps) {
  const [plantName, setPlantName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!plantName.trim()) return

    try {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error('No user logged in')

      const { data, error } = await supabase
        .from('plants')
        .insert([
          {
            name: plantName.trim(),
            user_id: userData.user.id,
            last_watered: new Date().toISOString(),
            watering_interval: 7
          }
        ])
        .select()
        .single()

      if (error) throw error

      onAddPlant(plantName.trim())
      setPlantName('')
    } catch (err) {
      console.error('Error adding plant:', err)
      setError('Failed to add plant')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Input
          type="text"
          value={plantName}
          onChange={(e) => setPlantName(e.target.value)}
          placeholder="Enter plant name"
          className="flex-grow border-[#a0c4a9] focus:border-[#2c7744] focus:ring-[#2c7744]"
        />
        <Button 
          type="submit"
          className="bg-[#2c7744] hover:bg-[#1e5631] text-white transition-colors"
        >
          Add Plant
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  )
} 