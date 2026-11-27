
function IngredientSelector({ availableIngredients, ingredients, onAddIngredient, searchTerm }) {
  const filteredIngredients = availableIngredients.filter((item) =>
    item.strIngredient.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="mt-6 w-full">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-gray-700">
          Available Ingredients:
        </h3>

        <span className="text-sm text-gray-500">
          {filteredIngredients.length} ingredients
        </span>
      </div>

      <div className="ingredient-grid grid max-h-57 grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3 md:grid-cols-4">
        {filteredIngredients.map((item) => {
          const isSelected = ingredients.some(
            (ingredient) =>
              ingredient.toLowerCase() === item.strIngredient.toLowerCase()
          )

          return (
            <button
              key={item.idIngredient}
              onClick={() => onAddIngredient(item.strIngredient)}
              className={`rounded-lg border px-3 py-2 text-sm transition ${isSelected
                  ? 'cursor-pointer border-green-500 bg-green-100 text-green-800 hover:bg-green-200'
                  : 'cursor-pointer border-gray-200 bg-gray-50 text-gray-700 hover:border-green-400 hover:bg-green-50'
                }`}
            >
              {item.strIngredient}
              {isSelected && ' ✓'}
            </button>
          )
        })}

        {filteredIngredients.length === 0 && (
          <p className="col-span-full py-4 text-center text-gray-500">
            No ingredients found.
          </p>
        )}

      </div>
    </div>
  )
}

export default IngredientSelector
