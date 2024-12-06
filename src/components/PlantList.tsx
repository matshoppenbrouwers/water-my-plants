import React from 'react'
import { Plant } from '../hooks/usePlantData.ts'
import { PlantItem } from './PlantItem.tsx'

interface PlantListProps {
  plants: Plant[]
  onWaterPlant: (id: string) => void
  onRemovePlant: (id: string) => void
}

export function PlantList({ plants, onWaterPlant, onRemovePlant }: PlantListProps) {
  return (
    <div className="space-y-4">
      {plants.map(plant => (
        <PlantItem
          key={plant.id}
          plant={plant}
          onWater={() => onWaterPlant(plant.id)}
          onRemove={() => onRemovePlant(plant.id)}
        />
      ))}
    </div>
  )
} 