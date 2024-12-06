import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { plantService } from '../services/plantService';
import type { Plant } from '../types/plant';

interface PlantState {
  plants: Plant[];
}

type PlantAction =
  | { type: 'ADD_PLANT'; plant: Plant }
  | { type: 'REMOVE_PLANT'; id: string }
  | { type: 'WATER_PLANT'; id: string }
  | { type: 'LOAD_PLANTS'; plants: Plant[] };

const initialState: PlantState = {
  plants: [],
};

const PlantContext = createContext<{
  state: PlantState;
  dispatch: React.Dispatch<PlantAction>;
} | undefined>(undefined);

function plantReducer(state: PlantState, action: PlantAction): PlantState {
  switch (action.type) {
    case 'ADD_PLANT':
      return {
        ...state,
        plants: [...state.plants, action.plant],
      };
    case 'REMOVE_PLANT':
      return {
        ...state,
        plants: state.plants.filter((plant) => plant.id !== action.id),
      };
    case 'WATER_PLANT':
      return {
        ...state,
        plants: state.plants.map((plant) =>
          plant.id === action.id
            ? { ...plant, lastWatered: new Date() }
            : plant
        ),
      };
    case 'LOAD_PLANTS':
      return {
        ...state,
        plants: action.plants,
      };
    default:
      return state;
  }
}

const STORAGE_KEY = 'plant-care-data';

function serializePlants(plants: Plant[]): string {
  return JSON.stringify(plants);
}

function deserializePlants(data: string): Plant[] {
  try {
    const plants = JSON.parse(data);
    return plants.map((plant: any) => ({
      ...plant,
      lastWatered: new Date(plant.lastWatered)
    }));
  } catch (error) {
    console.error('Error deserializing plants:', error);
    return [];
  }
}

export function PlantProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(plantReducer, initialState);
  
    useEffect(() => {
      // Load plants on mount
      async function loadPlants() {
        try {
          const plants = await plantService.getPlants();
          dispatch({ type: 'LOAD_PLANTS', plants });
        } catch (error) {
          console.error('Error loading plants:', error);
        }
      }
      loadPlants();
    }, []);
  
    // Wrap the context value in a memoized object with async methods
    const value = React.useMemo(() => ({
      state,
      dispatch,
      async addPlant(name: string, species?: string, wateringInterval?: number) {
        try {
          const plant = await plantService.addPlant({ name, species, wateringInterval });
          dispatch({ type: 'ADD_PLANT', plant });
        } catch (error) {
          console.error('Error adding plant:', error);
        }
      },
      async waterPlant(id: string) {
        try {
          const updatedPlant = await plantService.updatePlant(id, { 
            last_watered: new Date().toISOString() 
          });
          dispatch({ type: 'WATER_PLANT', id });
        } catch (error) {
          console.error('Error watering plant:', error);
        }
      },
      async removePlant(id: string) {
        try {
          await plantService.deletePlant(id);
          dispatch({ type: 'REMOVE_PLANT', id });
        } catch (error) {
          console.error('Error removing plant:', error);
        }
      }
    }), [state]);
  
    return (
      <PlantContext.Provider value={value}>
        {children}
      </PlantContext.Provider>
    );
  }

export function usePlants() {
  const context = useContext(PlantContext);
  if (context === undefined) {
    throw new Error('usePlants must be used within a PlantProvider');
  }
  return context;
} 