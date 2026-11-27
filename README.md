# 🍳 Recipe Finder

A React application that helps users discover recipes based on the ingredients they have available at home.

Users can search for recipes, explore ingredient matches, view detailed cooking instructions, and save their favourite recipes for later.

## ✨ Features

- **Ingredient Selection:** Search and select ingredients from an available ingredients list.
- **Recipe Search:** Find recipes based on the selected ingredients.
- **Ingredient Matching:** See how many of your selected ingredients match each recipe.
- **Recipe Details:** View recipe ingredients, measurements, and cooking instructions.
- **Favorites:** Save and remove favourite recipes.
- **Data Persistence:** Ingredients and favourite recipes are stored using `localStorage`.
- **Responsive Design:** Interface adapted to different screen sizes.

## 🛠️ Technologies

- React
- JavaScript
- Tailwind CSS
- Vite
- TheMealDB API
- HTML5
- CSS3

## 📸 Screenshots

*Screenshots coming soon.*

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and npm installed.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/RGalrao/recipes_app.git
   ```

2. Navigate to the project folder:

   ```bash
   cd recipes_app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal (usually `http://localhost:5173`).

## 🌐 API

This project uses [TheMealDB API](https://www.themealdb.com/api.php) to retrieve ingredient lists, recipe search results, and recipe details.

## 📂 Project Structure

```text
src/
├── components/
│   ├── ingredients/
│   ├── layout/
│   └── recipes/
├── hooks/
├── services/
├── App.jsx
├── index.css
└── main.jsx
```

## 📌 Future Improvements

- Add more advanced recipe filtering options.
- Improve loading and error states.
- Add recipe sorting options.
- Improve the overall user experience.

## 👨‍💻 Author

**Rodrigo Galrão**

[GitHub](https://github.com/RGalrao)

---

*Built as a personal project to practise React, JavaScript, API integration, and modern frontend development.*