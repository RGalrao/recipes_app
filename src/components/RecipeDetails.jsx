function RecipeDetails({ meal, availableIngredients }) {

  const ingredients = Array.from({ length: 20 }, (_, index) => {
    const ingredient = meal[`strIngredient${index + 1}`]
    const measure = meal[`strMeasure${index + 1}`]

    if (!ingredient || !ingredient.trim()) return null

    return {
      ingredient,
      measure,
    }
  }).filter(Boolean)

  const missingIngredients = ingredients.filter(
    (item) =>
      !availableIngredients.some(
        (available) =>
          available.trim().toLowerCase() === item.ingredient.trim().toLowerCase()
      )
  )

  const availableRecipeIngredients = ingredients.filter(
    (item) =>
      availableIngredients.some(
        (available) =>
          available.trim().toLowerCase() ===
          item.ingredient.trim().toLowerCase()
      )
  )


  return (
    <div className="mt-4 border-t border-gray-200 pt-4">

      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">

        {/* Available Ingredients */}
        <div className="rounded-xl border border-green-200 bg-green-50/50 p-4">
          <h4 className="mb-3 text-lg font-bold text-green-700">
            Available ingredients:
          </h4>

          {availableRecipeIngredients.length > 0 ? (
            <ul className="space-y-2">
              {availableRecipeIngredients.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between gap-3 text-sm text-gray-700"
                >
                  <span>{item.ingredient}</span>
                  <span className="font-medium text-gray-500">
                    {item.measure}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">
              No ingredients available.
            </p>
          )}
        </div>

        {/* Missing Ingredients */}
        <div className="rounded-xl border border-red-200 bg-red-50/50 p-4">
          <h4 className="mb-3 text-lg font-bold text-red-600">
            Missing ingredients:
          </h4>

          {missingIngredients.length > 0 ? (
            <ul className="space-y-2">
              {missingIngredients.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between gap-3 text-sm text-gray-700"
                >
                  <span>{item.ingredient}</span>
                  <span className="font-medium text-gray-500">
                    {item.measure}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm font-medium text-green-600">
              You have all the ingredients!
            </p>
          )}
        </div>

      </div>

      <h4 className="mb-3 text-lg font-bold text-green-700">
        Instructions:
      </h4>

      <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
        {meal.strInstructions}
      </p>

    </div>
  )

}

export default RecipeDetails