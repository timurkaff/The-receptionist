import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import RecipeForm from '../components/RecipeForm';
import Filter from '../components/Filter';
import AIChat from '../components/AIChat';
import { recipeStore } from '../models/RecipeStore';

const App: React.FC = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Рецепты</h1>
        <Routes>
          <Route path="/" element={
            <>
              <Filter />
              <RecipeList />
            </>
          } />
          <Route path="/add" element={<RecipeForm onAdd={recipeStore.addRecipe.bind(recipeStore)} />} />
          <Route path="/ai/recipe" element={<AIChat />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
