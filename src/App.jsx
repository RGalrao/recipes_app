
import { useState } from 'react'
import IngredientInput from './components/IngredientInput'
import IngredientList from './components/IngredientList'
import RecipeDetails from './components/RecipeDetails'

function App() {
  const [ingredients, setIngredients] = useState([])
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [loadingRecipe, setLoadingRecipe] = useState(false)

  const handleAddIngredient = (newIngredient) => {
    const alreadyExists = ingredients.some(
      (ingredient) =>
        ingredient.toLowerCase() === newIngredient.toLowerCase()
    )

    if (alreadyExists) return

    setIngredients([...ingredients, newIngredient])
  }

  const handleRemoveIngredient = (indexToRemove) => {
    setIngredients((previousIngredients) =>
      previousIngredients.filter(
        (_, index) => index !== indexToRemove
      )
    )
  }

  const handleSearchRecipes = async () => {
    if (ingredients.length === 0) return

    setLoading(true)
    setError('')
    setRecipes([])

    try {
      const ingredientQueries = ingredients.map((ingredient) =>
        ingredient.trim().replaceAll(' ', '_')
      )

      const responses = await Promise.all(
        ingredientQueries.map((ingredient) =>
          fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
          )
        )
      )

      const results = await Promise.all(
        responses.map((response) => response.json())
      )

      const recipeMatches = {}

      results.forEach((result) => {
        (result.meals ?? []).forEach((recipe) => {

          if (!recipeMatches[recipe.idMeal]) {
            recipeMatches[recipe.idMeal] = {
              ...recipe,
              matchCount: 0,
            }
          }

          recipeMatches[recipe.idMeal].matchCount += 1

        })
      })

      const sortedRecipes = Object.values(recipeMatches).sort(
        (a, b) => b.matchCount - a.matchCount
      )

      setRecipes(sortedRecipes)

      if (sortedRecipes.length === 0) {
        setError('No recipes found for your ingredients.')
      }

    } catch (error) {
      setError('Unable to load recipes. Please try again.')
      console.error(error)

    } finally {
      setLoading(false)
    }
  }

  const handleViewRecipe = async (recipeId) => {
    setLoadingRecipe(true)

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
      )

      const data = await response.json()

      setSelectedRecipe(data.meals?.[0] ?? null)

    } catch (error) {
      console.error(error)

    } finally {
      setLoadingRecipe(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-green-50 p-6">

      <h1 className="text-4xl font-bold text-green-700">
        Recipe Finder
      </h1>

      <p className="mt-3 text-gray-600">
        Find recipes with the ingredients you have at home.
      </p>

      <div className="mt-8 w-full max-w-4xl">

        <div className="mx-auto w-full max-w-lg">
          <IngredientInput onAddIngredient={handleAddIngredient} />

          <div className="flex justify-center">
            <button
              onClick={handleSearchRecipes}
              disabled={ingredients.length === 0 || loading}
              className="mt-6 w-full cursor-pointer rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Find Recipes'}
            </button>
          </div>
        </div>

        <IngredientList
          ingredients={ingredients}
          onRemoveIngredient={handleRemoveIngredient}
        />

      </div>

      {error && (
        <p className="mt-6 text-center text-red-500">
          {error}
        </p>
      )}

      {recipes.length > 0 && !selectedRecipe && (
        <div className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-gray-800">
                  {recipe.strMeal}
                </h3>

                <p className="mt-1 text-sm font-medium text-green-600">
                  {recipe.matchCount}/{ingredients.length} matches
                </p>

                <div className="mt-3 flex items-center justify-between gap-2">

                  <span className="text-sm text-black">
                    {recipe.strArea}
                  </span>

                  <button
                    onClick={() => handleViewRecipe(recipe.idMeal)}
                    className="cursor-pointer rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                  >
                    View Recipe
                  </button>

                </div>

              </div>

            </div>
          ))}
        </div>
      )}

      {selectedRecipe && (
        <div className="mt-8 w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-lg">

          <img
            src={selectedRecipe.strMealThumb}
            alt={selectedRecipe.strMeal}
            className="h-64 w-full object-cover sm:h-80"
          />

          <div className="p-6">

            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-green-700">
                {selectedRecipe.strMeal}
              </h2>

              <span className="text-sm text-black">
                {selectedRecipe.strArea}
              </span>
            </div>

            <RecipeDetails
              meal={selectedRecipe}
              availableIngredients={ingredients}
            />

            <button
              onClick={() => setSelectedRecipe(null)}
              className="mt-6 cursor-pointer rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Back to Recipes
            </button>

          </div>
        </div>
      )}

    </div>
  )
}

export default App
