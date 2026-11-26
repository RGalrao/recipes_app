function RecipeDetails({ meal }) {

    const ingredients = Array.from({ length: 20 }, (_, index) => {
    const ingredient = meal[`strIngredient${index + 1}`]
    const measure = meal[`strMeasure${index + 1}`]

    if (!ingredient || !ingredient.trim()) return null

    return {
      ingredient,
      measure,
    }
  }).filter(Boolean)


  return (
    <div className="mt-4 border-t border-gray-200 pt-4">

      <h4 className="mb-3 text-lg font-bold text-green-700">
        Ingredients needed:
      </h4>

      <ul className="mb-6 space-y-2">
        {ingredients.map((item, index) => (
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