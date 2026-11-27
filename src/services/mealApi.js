
const API_URL = 'https://www.themealdb.com/api/json/v1/1'

export const fetchIngredients = async () => {
  const response = await fetch(`${API_URL}/list.php?i=list`)

  if (!response.ok) {
    throw new Error('Unable to fetch ingredients')
  }

  const data = await response.json()

  return data.meals ?? []
}


export const searchRecipes = async (ingredients) => {
  const ingredientQueries = ingredients.map((ingredient) =>
    ingredient.trim().replaceAll(' ', '_')
  )

  const responses = await Promise.all(
    ingredientQueries.map((ingredient) =>
      fetch(
        `${API_URL}/filter.php?i=${encodeURIComponent(ingredient)}`
      )
    )
  )

  if (responses.some((response) => !response.ok)) {
    throw new Error('Unable to fetch recipes')
  }

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

  return Object.values(recipeMatches).sort(
    (a, b) => b.matchCount - a.matchCount
  )
}

export const fetchRecipeDetails = async (recipeId) => {
  const response = await fetch(`${API_URL}/lookup.php?i=${recipeId}`)

  if (!response.ok) {
    throw new Error('Unable to fetch recipe details')
  }

  const data = await response.json()

  return data.meals?.[0] ?? null
}


export const fetchFavoriteRecipes = async (favoriteIds) => {
  const favoriteMeals = await Promise.all(
    favoriteIds.map((recipeId) => fetchRecipeDetails(recipeId))
  )

  return favoriteMeals.filter(Boolean)
}