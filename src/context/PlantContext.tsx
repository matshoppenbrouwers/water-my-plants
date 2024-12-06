import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

interface Plant {
  id: string;
  name: string;
  species?: string;
  lastWatered: Date;
  wateringInterval: number; // in days
}

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
  const [state, dispatch] = useReducer(plantReducer, initialState, () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      return {
        plants: deserializePlants(savedData)
      };
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, serializePlants(state.plants));
  }, [state.plants]);

  return (
    <PlantContext.Provider value={{ state, dispatch }}>
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