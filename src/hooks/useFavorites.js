
import { useState, useEffect } from 'react'
import { fetchFavoriteRecipes } from '../services/mealApi'

function useFavorites() {
  // State
  const [favoriteRecipes, setFavoriteRecipes] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites')

    return savedFavorites ? JSON.parse(savedFavorites) : []
  })

  const [favoriteRecipeDetails, setFavoriteRecipeDetails] = useState([])

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favoriteRecipes))
  }, [favoriteRecipes])

  // Load favorite recipe details
  useEffect(() => {
    const loadFavoriteDetails = async () => {
      const details = await fetchFavoriteRecipes(favoriteRecipes)

      setFavoriteRecipeDetails(details)
    }

    loadFavoriteDetails()
  }, [favoriteRecipes])

  // Toggle favorite
  const handleToggleFavorite = (recipeId) => {
    setFavoriteRecipes((previousFavorites) =>
      previousFavorites.includes(recipeId)
        ? previousFavorites.filter((id) => id !== recipeId)
        : [...previousFavorites, recipeId]
    )
  }

  // Return
  return {
    favoriteRecipes,
    favoriteRecipeDetails,
    handleToggleFavorite,
  }
}

export default useFavorites
