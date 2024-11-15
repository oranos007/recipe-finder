import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import './App.css';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const fetchRecipes = async () => {
    setLoading(true); 
    try {
      const API_KEY = '0c50686db5964fcea8d6714f9012c0cb';
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${search}&apiKey=${API_KEY}`
      );
      const data = await response.json();

      if (data.results) {
        
        const detailedRecipes = await Promise.all(
          data.results.map(async (recipe) => {
            const detailedData = await fetchRecipeDetails(recipe.id);
            return {
              ...recipe,
              ingredients: detailedData.extendedIngredients, 
              description: detailedData.summary, 
            };
          })
        );
        setRecipes(detailedRecipes); 
        setError('');
      } else {
        setError('Aucune recette disponible');
      }
    } catch (err) {
      setError('Erreur lors de la récupération des données');
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  
  const fetchRecipeDetails = async (recipeId) => {
    const API_KEY = '0c50686db5964fcea8d6714f9012c0cb'; 
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
    );
    const data = await response.json();
    return data; 
  };


  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== '') {
      fetchRecipes();
    } else {
      setError('Veuillez entrer un ingrédient ou un plat');
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSearch} className="form">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher une recette..."
        />
        <button type="submit">Rechercher</button>
      </form>

      {error && <div className="text-red-500">{error}</div>}

      {loading ? (
        <p className="loading">Chargement des recettes...</p>
      ) : (
        <div className="grid">
          {recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))
          ) : (
            <p className="text-center">Aucune recette trouvée</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
