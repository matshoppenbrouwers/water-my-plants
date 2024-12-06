import React from 'react'
import { useState } from 'react'
import { Button } from './ui/button.tsx'
import { Input } from './ui/input.tsx'

interface AddPlantFormProps {
  onAddPlant: (name: string) => void
}

export function AddPlantForm({ onAddPlant }: AddPlantFormProps) {
  const [plantName, setPlantName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (plantName.trim()) {
      onAddPlant(plantName.trim())
      setPlantName('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
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
    </form>
  )
} 