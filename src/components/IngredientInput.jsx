
import { useState } from 'react'

function IngredientInput() {
  const [ingredient, setIngredient] = useState('')

  const handleAddIngredient = () => {
    console.log(ingredient)
    setIngredient('')
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Enter an ingredient..."
        value={ingredient}
        onChange={(event) => setIngredient(event.target.value)}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
      />

      <button
        onClick={handleAddIngredient}
        className="rounded-lg bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
      >
        Add
      </button>
    </div>
  )
}

export default IngredientInput
