const RecipeCard = ({ recipe }) => {
    return (
      <div className="max-w-sm shadow-lg rounded">
        <img className="w-full" src={recipe.image} alt={recipe.title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{recipe.title}</div>
          <div className="text-gray-700 text-base">
            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.name}</li>
                ))}
              </ul>
            ) : (
              <p>No ingredients available.</p>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default RecipeCard;
  