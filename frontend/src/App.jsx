import { useCallback, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import api from './axios'
import AddRecipePage from './pages/AddRecipePage.jsx'
import GenerateRecipePage from './pages/GenerateRecipePage.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ManageRecipesPage from './pages/ManageRecipesPage.jsx'
import RecipeDetailPage from './pages/RecipeDetailPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import { mapApiRecipe } from './utils/recipe.js'

function App() {
  const [recipes, setRecipes] = useState([])
  const [recipesLoading, setRecipesLoading] = useState(false)
  const [recipesError, setRecipesError] = useState('')

  const loadRecipes = useCallback(async () => {
    setRecipesLoading(true)
    setRecipesError('')

    try {
      const response = await api.get('/recipe/getAllRecipe')
      setRecipes(response.data.recipe.map(mapApiRecipe))
    } catch (error) {
      setRecipes([])
      setRecipesError(
        error.response?.data?.message ||
          'Unable to load recipes. Please try again.',
      )
    } finally {
      setRecipesLoading(false)
    }
  }, [])

  async function updateRecipe(updatedRecipe) {
    await api.put(`/recipe/updateRecipe/${updatedRecipe.id}`, {
      title: updatedRecipe.name,
      discription: updatedRecipe.description,
      ingredients: updatedRecipe.ingredients,
      recipe: updatedRecipe.instructions,
    })
    setRecipes((currentRecipes) =>
      currentRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe,
      ),
    )
  }

  async function deleteRecipe(recipeId) {
    await api.delete(`/recipe/deleteRecipe/${recipeId}`)
    setRecipes((currentRecipes) =>
      currentRecipes.filter((recipe) => recipe.id !== recipeId),
    )
  }

  async function addRecipe(formData) {
    const response = await api.post('/recipe/CreateRecipe', formData)
    const newRecipe = mapApiRecipe(response.data.recipe)
    setRecipes((currentRecipes) => [newRecipe, ...currentRecipes])
  }

  return (
    <Routes>
      <Route
        element={
          <HomePage
            onLoadRecipes={loadRecipes}
            recipes={recipes}
            recipesError={recipesError}
            recipesLoading={recipesLoading}
          />
        }
        path="/"
      />
      <Route
        element={<AddRecipePage onAddRecipe={addRecipe} />}
        path="/add"
      />
      <Route element={<GenerateRecipePage />} path="/generate" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<RegisterPage />} path="/register" />
      <Route element={<RecipeDetailPage />} path="/recipes/:id" />
      <Route
        element={
          <ManageRecipesPage
            onLoadRecipes={loadRecipes}
            onDeleteRecipe={deleteRecipe}
            onUpdateRecipe={updateRecipe}
            recipes={recipes}
            recipesError={recipesError}
            recipesLoading={recipesLoading}
          />
        }
        path="/manage"
      />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  )
}

export default App
