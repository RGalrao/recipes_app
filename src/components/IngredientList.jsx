
function IngredientList({ ingredients, onRemoveIngredient }) {
  return (
    <div className="mt-6 w-full">

      <h2 className="text-lg font-semibold text-gray-700">
        Your ingredients: ({ingredients.length} ingredient{ingredients.length !== 1 && 's'})
      </h2>

      {ingredients.length === 0 ? (
        <p className="mt-3 text-sm text-gray-500">
          No ingredients added yet. Start by adding some!
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {ingredients.map((ingredient, index) => (
            <li
              key={`${ingredient}-${index}`}
              className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm"
            >
              <span className="text-gray-700">
                {ingredient}
              </span>

              <button
                onClick={() => onRemoveIngredient(index)}
                aria-label={`Remove ${ingredient}`}
                className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full text-red-500 transition hover:bg-red-50 hover:text-red-700"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default IngredientList
