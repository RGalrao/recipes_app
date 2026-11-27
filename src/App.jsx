
import { useState, useEffect } from 'react'
import IngredientInput from './components/IngredientInput'
import IngredientList from './components/IngredientList'
import RecipeDetails from './components/RecipeDetails'
import IngredientSelector from './components/IngredientSelector'

function App() {
  const [ingredients, setIngredients] = useState(() => {
    const savedIngredients = localStorage.getItem('ingredients')

    return savedIngredients ? JSON.parse(savedIngredients) : []
  })

  const [recipes, setRecipes] = useState([])

  const [favoriteRecipes, setFavoriteRecipes] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites')

    return savedFavorites ? JSON.parse(savedFavorites) : []
  })

  const [favoriteRecipeDetails, setFavoriteRecipeDetails] = useState([])


  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [loadingRecipe, setLoadingRecipe] = useState(false)
  const [activeTab, setActiveTab] = useState('search')
  const [availableIngredients, setAvailableIngredients] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
        )

        const data = await response.json()

        setAvailableIngredients(data.meals ?? [])

      } catch (error) {
        console.error('Unable to load ingredients:', error)
      }
    }

    fetchIngredients()
  }, [])

  useEffect(() => {
    localStorage.setItem('ingredients', JSON.stringify(ingredients))
  }, [ingredients])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favoriteRecipes))
  }, [favoriteRecipes])

  useEffect(() => {
    const fetchFavoriteDetails = async () => {
      if (favoriteRecipes.length === 0) {
        setFavoriteRecipeDetails([])
        return
      }

      try {
        const responses = await Promise.all(
          favoriteRecipes.map((recipeId) =>
            fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
            )
          )
        )

        const results = await Promise.all(
          responses.map((response) => response.json())
        )

        const favoriteMeals = results
          .map((result) => result.meals?.[0])
          .filter(Boolean)

        setFavoriteRecipeDetails(favoriteMeals)

      } catch (error) {
        console.error('Unable to load favorite recipes:', error)
      }
    }

    fetchFavoriteDetails()
  }, [favoriteRecipes])

  const handleAddIngredient = (newIngredient) => {
    const alreadyExists = ingredients.some(
      (ingredient) =>
        ingredient.toLowerCase() === newIngredient.toLowerCase()
    )

    if (alreadyExists) return

    setIngredients([...ingredients, newIngredient])
  }

  const handleToggleIngredient = (ingredient) => {
    setIngredients((previousIngredients) => {
      const isAlreadySelected = previousIngredients.some(
        (item) => item.toLowerCase() === ingredient.toLowerCase()
      )

      if (isAlreadySelected) {
        return previousIngredients.filter(
          (item) => item.toLowerCase() !== ingredient.toLowerCase()
        )
      }

      return [...previousIngredients, ingredient]
    })
  }

  const handleRemoveIngredient = (indexToRemove) => {
    setIngredients((previousIngredients) =>
      previousIngredients.filter(
        (_, index) => index !== indexToRemove
      )
    )
  }

  const handleClearIngredients = () => {
    setIngredients([])
  }

  const handleToggleFavorite = (recipeId) => {
    setFavoriteRecipes((previousFavorites) => {
      if (previousFavorites.includes(recipeId)) {
        return previousFavorites.filter((id) => id !== recipeId)
      }

      return [...previousFavorites, recipeId]
    })
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

      <div className="mt-6 flex gap-3">

        <button
          onClick={() => setActiveTab('search')}
          className={`rounded-lg px-5 py-2 font-semibold transition ${activeTab === 'search'
            ? 'bg-green-600 text-white'
            : 'bg-white text-gray-600 hover:bg-green-100'
            }`}
        >
          Find Recipes
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`rounded-lg px-5 py-2 font-semibold transition ${activeTab === 'favorites'
            ? 'bg-green-600 text-white'
            : 'bg-white text-gray-600 hover:bg-green-100'
            }`}
        >
          Favorites ({favoriteRecipes.length})
        </button>

      </div>
      {activeTab === 'search' && (
        <div className="mt-8 w-full max-w-4xl">


          <div className="mx-auto w-full max-w-4xl">
            <IngredientSelector
              availableIngredients={availableIngredients}
              ingredients={ingredients}
              onAddIngredient={handleToggleIngredient}
              searchTerm={searchTerm}
            />

            <div className="mx-auto mt-4 w-full max-w-lg">
              <IngredientInput
                onAddIngredient={handleAddIngredient}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>

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

          {ingredients.length > 0 && (
            <div className="mt-3 flex justify-center">
              <button
                onClick={handleClearIngredients}
                className="cursor-pointer text-sm font-medium text-red-500 transition hover:text-red-700"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="mt-6 text-center text-red-500">
          {error}
        </p>
      )}

      {activeTab === 'search' && recipes.length > 0 && !selectedRecipe && (
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
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-gray-800">
                    {recipe.strMeal}
                  </h3>

                  <button
                    onClick={() => handleToggleFavorite(recipe.idMeal)}
                    className="cursor-pointer text-2xl text-red-500 transition hover:scale-110"
                    title="Add to favorites"
                  >
                    {favoriteRecipes.includes(recipe.idMeal) ? '♥' : '♡'}
                  </button>
                </div>

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
      {activeTab === 'favorites' && (
        favoriteRecipeDetails.length > 0 ? (
          <div className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {favoriteRecipeDetails.map((recipe) => (
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

                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-gray-800">
                      {recipe.strMeal}
                    </h3>

                    <button
                      onClick={() => handleToggleFavorite(recipe.idMeal)}
                      className="cursor-pointer text-2xl text-red-500 transition hover:scale-110"
                      title="Remove from favorites"
                    >
                      ♥
                    </button>
                  </div>

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
        ) : (
          <p className="mt-8 text-center text-gray-500">
            You haven't saved any favorite recipes yet.
          </p>
        )
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
