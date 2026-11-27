import { useState } from 'react'
import { searchRecipes } from '../services/mealApi'

function useRecipes() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearchRecipes = async (ingredients) => {
    if (ingredients.length === 0) return

    setLoading(true)
    setError('')
    setRecipes([])

    try {
      const sortedRecipes = await searchRecipes(ingredients)

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

  return {
    recipes,
    loading,
    error,
    handleSearchRecipes,
  }
}

export default useRecipes