
function IngredientInput({ onAddIngredient, searchTerm, onSearchChange }) {

  const handleAddIngredient = (event) => {
    event.preventDefault()

    const trimmedIngredient = searchTerm.trim()

    if (!trimmedIngredient) return

    onAddIngredient(trimmedIngredient)
    onSearchChange('')
  }

  return (
    <form onSubmit={handleAddIngredient} className="flex gap-2">
      <input
        type="text"
        placeholder="Search or add an ingredient..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
      />

      <button
        type="submit"
        className="cursor-pointer rounded-lg bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
      >
        Add
      </button>
    </form>
  )
}

export default IngredientInput
