import React from 'react'
import { Plant } from '../hooks/usePlantData.ts'
import { Button } from './ui/button.tsx'
import { Droplet, Trash2 } from 'lucide-react'

interface PlantItemProps {
  plant: Plant
  onWater: () => void
  onRemove: () => void
}

export function PlantItem({ plant, onWater, onRemove }: PlantItemProps) {
  const daysSinceWatered = Math.floor((Date.now() - plant.lastWatered) / (1000 * 60 * 60 * 24))

  return (
    <div className="bg-white border rounded-lg border-[#a0c4a9] hover:border-[#2c7744] transition-colors p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-[#2c7744]">{plant.name}</h3>
          <p className="text-sm text-gray-600">
            {daysSinceWatered === 0
              ? 'Watered today'
              : `${daysSinceWatered} day${daysSinceWatered === 1 ? '' : 's'} since last watered`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={onWater} 
            variant="outline" 
            size="icon" 
            className="border-[#a0c4a9] hover:border-[#2c7744]"
          >
            <Droplet className="h-4 w-4" />
          </Button>
          <Button 
            onClick={onRemove} 
            variant="outline" 
            size="icon" 
            className="border-[#a0c4a9] hover:border-[#c44536] hover:text-[#c44536]"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 