import React, { useState } from 'react'
import { Button } from './ui/button'
import { Droplet, Trash2 } from 'lucide-react'

interface PlantItemProps {
  plant: {
    id: string;
    name: string;
    lastWatered: number;
  }
  onWater: () => void
  onRemove: () => void
}

export function PlantItem({ plant, onWater, onRemove }: PlantItemProps) {
  const [isDropletFilled, setIsDropletFilled] = useState(false)
  const daysSinceWatered = Math.floor((Date.now() - Number(plant.lastWatered)) / (1000 * 60 * 60 * 24))
  
  const handleWater = () => {
    setIsDropletFilled(true)
    onWater()
  }

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
          <p className="text-xs text-gray-400">
            Last watered: {new Date(Number(plant.lastWatered)).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleWater} 
            variant="outline" 
            size="icon" 
            className="border-[#a0c4a9] hover:border-[#2c7744]"
          >
            <Droplet 
              className={`h-4 w-4 transition-colors ${
                isDropletFilled ? 'fill-[#2c7744] text-[#2c7744]' : ''
              }`}
            />
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