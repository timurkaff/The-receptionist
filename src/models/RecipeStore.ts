import { makeAutoObservable } from 'mobx';
import { Recipe } from '../types/Recipe';
import data from '../assets/data.json';

class RecipeStore {
  recipes: Recipe[] = data;
  filter: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  removeRecipe(id: number) {
    this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
  }

  updateRecipe(updatedRecipe: Recipe) {
    this.recipes = this.recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
  }

  setFilter(filter: string) {
    this.filter = filter;
  }

  get filteredRecipes() {
    if (!this.filter) {
      return this.recipes;
    }
    return this.recipes.filter((recipe) =>
      recipe.category.toLowerCase().includes(this.filter.toLowerCase())
    );
  }
}

export const recipeStore = new RecipeStore(); 