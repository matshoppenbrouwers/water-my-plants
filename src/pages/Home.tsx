import React from 'react';
import { usePlantData } from '../hooks/usePlantData.ts';
import { AddPlantForm } from '../components/AddPlantForm.tsx';
import { PlantList } from '../components/PlantList.tsx';

export default function Home() {
  const { plants, addPlant, waterPlant, removePlant } = usePlantData();

  return (
    <div className="min-h-screen bg-white text-gray-800 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-center text-[#2c7744]">
          Plant Keeper
        </h1>
        <div className="mb-12">
          <AddPlantForm onAddPlant={addPlant} />
          {plants.length === 0 && (
            <p className="text-center italic text-gray-500 mt-4">Add your first plant to get started</p>
          )}
        </div>
        {plants.length > 0 && (
          <PlantList 
            plants={plants} 
            onWaterPlant={waterPlant} 
            onRemovePlant={removePlant} 
          />
        )}
      </div>
    </div>
  );
} 