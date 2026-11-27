
import { useState, useEffect } from 'react'

import { fetchIngredients, fetchRecipeDetails } from './services/mealApi'

import Navbar from './components/layout/Navbar'
import IngredientInput from './components/ingredients/IngredientInput'
import IngredientList from './components/ingredients/IngredientList'
import IngredientSelector from './components/ingredients/IngredientSelector'
import RecipeDetails from './components/recipes/RecipeDetails'
import RecipeCard from './components/recipes/RecipeCard'

import useIngredients from './hooks/useIngredients'
import useFavorites from './hooks/useFavorites'
import useRecipes from './hooks/useRecipes'

function App() {

  const {
    ingredients,
    handleAddIngredient,
    handleToggleIngredient,
    handleRemoveIngredient,
    handleClearIngredients,
  } = useIngredients()

  const {
    favoriteRecipes,
    favoriteRecipeDetails,
    handleToggleFavorite,
  } = useFavorites()

  const {
    recipes,
    loading,
    error,
    handleSearchRecipes,
  } = useRecipes()

  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [loadingRecipe, setLoadingRecipe] = useState(false)
  const [activeTab, setActiveTab] = useState('search')
  const [availableIngredients, setAvailableIngredients] = useState([])
  const [searchTerm, setSearchTerm] = useState('')


  useEffect(() => {
    const loadIngredients = async () => {
      try {
        const data = await fetchIngredients()
        setAvailableIngredients(data)
      } catch (error) {
        console.error('Unable to load ingredients:', error)
      }
    }

    loadIngredients()
  }, [])

  const handleViewRecipe = async (recipeId) => {
    setLoadingRecipe(true)

    try {
      const recipe = await fetchRecipeDetails(recipeId)

      setSelectedRecipe(recipe)
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

      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        favoriteCount={favoriteRecipes.length}
      />

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
                onClick={() => handleSearchRecipes(ingredients)}
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
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              isFavorite={favoriteRecipes.includes(recipe.idMeal)}
              onToggleFavorite={handleToggleFavorite}
              onViewRecipe={handleViewRecipe}
              matchCount={recipe.matchCount}
              totalIngredients={ingredients.length}
            />
          ))}
        </div>
      )}

      {activeTab === 'favorites' && (
        favoriteRecipeDetails.length > 0 ? (
          <div className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {favoriteRecipeDetails.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                isFavorite={true}
                onToggleFavorite={handleToggleFavorite}
                onViewRecipe={handleViewRecipe}
              />
            ))}

          </div>
        ) : (
          <p className="mt-8 text-center text-gray-500">
            You haven't saved any favorite recipes yet.
          </p>
        )
      )}


      {loadingRecipe && (
        <p className="mt-6 text-center text-gray-500">
          Loading recipe details...
        </p>
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