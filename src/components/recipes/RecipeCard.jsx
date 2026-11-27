
function RecipeCard({
  recipe,
  isFavorite,
  onToggleFavorite,
  onViewRecipe,
  matchCount,
  totalIngredients,
}) {
  
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-gray-800">
            {recipe.strMeal}
          </h3>

          <button
            onClick={() => onToggleFavorite(recipe.idMeal)}
            className="cursor-pointer text-2xl text-red-500 transition hover:scale-110"
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>

        {matchCount !== undefined && (
          <p className="mt-1 text-sm font-medium text-green-600">
            {matchCount}/{totalIngredients} matches
          </p>
        )}

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-sm text-black">
            {recipe.strArea}
          </span>

          <button
            onClick={() => onViewRecipe(recipe.idMeal)}
            className="cursor-pointer rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            View Recipe
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
