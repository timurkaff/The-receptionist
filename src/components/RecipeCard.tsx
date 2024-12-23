import React from 'react';
import { Recipe } from '../types/Recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onRemove: (id: number) => void;
  highlighted?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onRemove, highlighted }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 flex flex-col ${highlighted ? 'border-4 border-green-500 animate-pulse' : ''} hover:shadow-lg transition-shadow duration-300`}>
      <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-48 object-cover rounded-md mb-4" />
      <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
      <p className="text-gray-700 mb-2">
        <strong>Ингредиенты:</strong> {recipe.ingredients.join(', ')}
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Инструкции:</strong> {recipe.instructions.join(' ')}
      </p>
      <div className="flex justify-between items-end mt-auto">
        <span className="text-gray-500">Категория: {recipe.category}</span>
        <button onClick={() => onRemove(recipe.id)} className="bg-accent-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
          Удалить
        </button>
      </div>
    </div>
  );
};

export default RecipeCard; 