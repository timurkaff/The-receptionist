import React, { useState } from 'react';
import { recipeStore } from '../models/RecipeStore';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types/Recipe';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AIChat: React.FC = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const apiKey = "AIzaSyDJHQQT3DdGrHNXU9MkIbrQ9Y1mUZ_9lHU";
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecipe('');

    try {
      const prompt = `Напиши очень краткий рецепт, используя следующие ингредиенты: ${ingredients}.`;
      const result = await model.generateContent(prompt);
      const response = result.response;
      const recipeText = response.text();
      setRecipe(recipeText);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecipe = () => {
    if (recipe) {
      const newRecipe: Recipe = {
        id: Date.now(),
        title: 'Рецепт от AI',
        ingredients: ingredients.split(',').map(item => item.trim()),
        instructions: recipe.split('.').map(item => item.trim()),
        imageUrl: 'https://placekitten.com/200/300',
        category: 'AI',
      };
      recipeStore.addRecipe(newRecipe);
      navigate('/');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">AI Чат</h2>
      <form onSubmit={handleSubmit}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Введите ингредиенты (через запятую):
        </label>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
        <div className="flex justify-between mt-5">
        <button type="submit" className="bg-accent-green hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 transition-colors duration-300">
          Найти рецепт
        </button>
        <button onClick={handleBack} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2 transition-colors duration-300">
              Назад к рецептам
          </button>
        </div>
      </form>
      {loading && <div className="text-gray-700">Загрузка...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {recipe && (
        <div className="text-gray-700 mt-4">
          <strong>Рецепт:</strong>
          <p>{recipe}</p>
          <div className="flex gap-2">
            <button onClick={handleAddRecipe} className="bg-accent-gold hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2 transition-colors duration-300">
              Выбрать рецепт
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChat; 