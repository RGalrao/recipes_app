
import { useState } from 'react'
import IngredientInput from './components/IngredientInput'
import IngredientList from './components/IngredientList'

function App() {
  const [ingredients, setIngredients] = useState([])

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


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-green-50 p-6">

      <h1 className="text-4xl font-bold text-green-700">
        Recipe Finder
      </h1>

      <p className="mt-3 text-gray-600">
        Find recipes with the ingredients you have at home.
      </p>

      <div className="mt-8 w-full max-w-lg">
        <IngredientInput onAddIngredient={handleAddIngredient} />
        <IngredientList 
          ingredients={ingredients} 
          onRemoveIngredient={handleRemoveIngredient}
        />
      </div>

    </div>
  )
}

export default App
