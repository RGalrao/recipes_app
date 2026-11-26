
function IngredientList({ ingredients, onRemoveIngredient }) {
  return (
    <div className="mt-6 w-full ">
      <h3 className="mb-3 text-center font-semibold text-gray-700">
        Your ingredients: {ingredients.length}
      </h3>

      {ingredients.length === 0 ? (
        <p className="text-center text-sm text-gray-500">
          No ingredients added yet.
        </p>
      ) : (
        <div className="flex justify-center flex-wrap gap-2">
          {ingredients.map((ingredient, index) => (
            <button
              key={`${ingredient}-${index}`}
              onClick={() => onRemoveIngredient(index)}
              title="Click to remove"
              className="cursor-pointer rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-medium text-green-800 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
            >
              {ingredient}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default IngredientList
