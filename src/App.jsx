import IngredientInput from './components/IngredientInput'

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-green-50 p-6">

      <h1 className="text-4xl font-bold text-green-700">
        Recipe Finder
      </h1>

      <p className="mt-3 text-gray-600">
        Find recipes with the ingredients you have at home.
      </p>

      <div className="mt-8 w-full max-w-lg">
        <IngredientInput />
      </div>

    </div>
  )
}

export default App