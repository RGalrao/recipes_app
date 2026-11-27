
function Navbar({ activeTab, onTabChange, favoriteCount }) {
  return (
    <nav className="mt-6 flex gap-3">
      <button
        onClick={() => onTabChange('search')}
        className={`cursor-pointer rounded-lg px-5 py-2 font-semibold transition ${
          activeTab === 'search'
            ? 'bg-green-600 text-white'
            : 'bg-white text-gray-600 hover:bg-green-100'
        }`}
      >
        Find Recipes
      </button>

      <button
        onClick={() => onTabChange('favorites')}
        className={`cursor-pointer rounded-lg px-5 py-2 font-semibold transition ${
          activeTab === 'favorites'
            ? 'bg-green-600 text-white'
            : 'bg-white text-gray-600 hover:bg-green-100'
        }`}
      >
        Favorites ({favoriteCount})
      </button>
    </nav>
  )
}

export default Navbar
