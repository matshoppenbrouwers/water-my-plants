import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlants } from '../context/PlantContext';

function AddPlant() {
  const navigate = useNavigate();
  const { dispatch } = usePlants();
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    wateringInterval: 7,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPlant = {
      id: crypto.randomUUID(),
      name: formData.name,
      species: formData.species,
      lastWatered: new Date(),
      wateringInterval: Number(formData.wateringInterval),
    };

    dispatch({ type: 'ADD_PLANT', plant: newPlant });
    navigate('/plants');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Plant</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Plant Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label htmlFor="species" className="block text-sm font-medium text-gray-700">
              Species (Optional)
            </label>
            <input
              type="text"
              id="species"
              name="species"
              value={formData.species}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label htmlFor="wateringInterval" className="block text-sm font-medium text-gray-700">
              Watering Interval (days)
            </label>
            <input
              type="number"
              id="wateringInterval"
              name="wateringInterval"
              min="1"
              required
              value={formData.wateringInterval}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn bg-gray-50 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Plant
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddPlant; 