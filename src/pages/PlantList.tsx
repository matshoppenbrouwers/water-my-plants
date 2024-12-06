import React, { useMemo } from 'react';
import { usePlants } from '../context/PlantContext';
import { formatDistanceToNow } from 'date-fns';
import type { Plant } from '../types/plant';

function PlantList() {
  const { state, dispatch } = usePlants();

  const sortedPlants = useMemo(() => {
    return [...state.plants].sort((a, b) => {
      const aDays = Math.floor(
        (new Date().getTime() - new Date(a.last_watered).getTime()) / (1000 * 60 * 60 * 24)
      );
      const bDays = Math.floor(
        (new Date().getTime() - new Date(b.last_watered).getTime()) / (1000 * 60 * 60 * 24)
      );
      
      const aNeeds = aDays >= a.watering_interval;
      const bNeeds = bDays >= b.watering_interval;
      
      if (aNeeds && !bNeeds) return -1;
      if (!aNeeds && bNeeds) return 1;
      return bDays - aDays;
    });
  }, [state.plants]);

  const getWateringStatus = (plant: Plant) => {
    const daysSinceWatered = Math.floor(
      (new Date().getTime() - new Date(plant.last_watered).getTime()) / (1000 * 60 * 60 * 24)
    );
    const daysUntilWatering = plant.watering_interval - daysSinceWatered;

    if (daysUntilWatering <= 0) {
      return {
        text: 'Needs water!',
        className: 'text-red-600 font-medium'
      };
    }
    if (daysUntilWatering <= 1) {
      return {
        text: 'Water tomorrow',
        className: 'text-orange-600'
      };
    }
    return {
      text: `Water in ${daysUntilWatering} days`,
      className: 'text-green-600'
    };
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Plants</h1>
      
      {sortedPlants.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No plants added yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {sortedPlants.map((plant) => {
            const status = getWateringStatus(plant);
            return (
              <div key={plant.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{plant.name}</h2>
                    {plant.species && (
                      <p className="text-gray-500 text-sm">{plant.species}</p>
                    )}
                    <p className="text-gray-600 mt-2">
                      Last watered: {formatDistanceToNow(new Date(plant.last_watered))} ago
                    </p>
                    <p className={status.className}>{status.text}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => dispatch({ type: 'WATER_PLANT', id: plant.id })}
                      className="btn btn-primary"
                    >
                      Water
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to remove this plant?')) {
                          dispatch({ type: 'REMOVE_PLANT', id: plant.id });
                        }
                      }}
                      className="btn bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PlantList; 