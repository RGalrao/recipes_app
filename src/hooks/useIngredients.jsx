

import { useState, useEffect } from 'react'

function useIngredients() {
  const [ingredients, setIngredients] = useState(() => {
    const savedIngredients = localStorage.getItem('ingredients')

    return savedIngredients ? JSON.parse(savedIngredients) : []
  })

  useEffect(() => {
    localStorage.setItem('ingredients', JSON.stringify(ingredients))
  }, [ingredients])

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

  return {
    ingredients,
    handleAddIngredient,
    handleToggleIngredient,
    handleRemoveIngredient,
    handleClearIngredients,
  }
}

export default useIngredients
