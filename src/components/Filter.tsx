import React from 'react';
import { observer } from 'mobx-react-lite';
import { recipeStore } from '../models/RecipeStore';
import { Link } from 'react-router-dom';

const Filter: React.FC = observer(() => {
  return (
    <div className="mb-4 flex justify-between items-center">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Фильтр по категории:</label>
        <input
          type="text"
          value={recipeStore.filter}
          onChange={(e) => recipeStore.setFilter(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Введите категорию"
        />
      </div>
      <div className="flex gap-2">
        <Link to="/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Добавить рецепт
        </Link>
        <Link to="/ai/recipe" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          AI рецепт
        </Link>
      </div>
    </div>
  );
});

export default Filter; 