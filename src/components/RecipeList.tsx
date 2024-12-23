import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { recipeStore } from '../models/RecipeStore';
import RecipeCard from './RecipeCard';
import Confetti from 'react-confetti';
import Snowfall from 'react-snowfall';

const RecipeList: React.FC = observer(() => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [randomRecipe, setRandomRecipe] = useState<number | null>(null);

  const handleRandomRecipe = () => {
    if (recipeStore.recipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * recipeStore.recipes.length);
      setRandomRecipe(recipeStore.recipes[randomIndex].id);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  return (
    <div className="relative">
      <Snowfall snowflakeCount={100} />
      {showConfetti && <Confetti />}
      <div className="mb-4 flex justify-end">
        <button onClick={handleRandomRecipe} className="bg-accent-green hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
          Выбрать случайный рецепт
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipeStore.filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onRemove={recipeStore.removeRecipe.bind(recipeStore)}
            highlighted={randomRecipe === recipe.id}
          />
        ))}
      </div>
    </div>
  );
});

export default RecipeList; 