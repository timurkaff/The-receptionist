import React, { useState } from 'react';
import { Recipe } from '../types/Recipe';
import { useNavigate } from 'react-router-dom';

interface RecipeFormProps {
  onAdd: (recipe: Recipe) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecipe: Recipe = {
      id: Date.now(),
      title,
      ingredients: ingredients.split(',').map(item => item.trim()),
      instructions: instructions.split('.').map(item => item.trim()),
      imageUrl,
      category,
    };
    onAdd(newRecipe);
    setTitle('');
    setIngredients('');
    setInstructions('');
    setImageUrl('');
    setCategory('');
    setNotification('Рецепт добавлен!');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Добавить рецепт</h2>
      {notification && <div className="bg-green-200 text-green-800 p-2 mb-4 rounded">{notification}</div>}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Название:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Ингредиенты (через запятую):</label>
        <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Инструкции (через точку):</label>
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">URL изображения:</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Категория:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div className="flex justify-between">
        <button type="submit" className="bg-accent-green hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
          Добавить
        </button>
        <button type="button" onClick={handleBack} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
          Назад к рецептам
        </button>
      </div>
    </form>
  );
};

export default RecipeForm; 