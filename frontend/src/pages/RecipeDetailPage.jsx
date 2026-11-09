import { useEffect, useState } from 'react'
import { LuArrowLeft, LuChefHat } from 'react-icons/lu'
import { Link, useParams } from 'react-router-dom'
import api from '../axios'
import RecipeImage from '../components/RecipeImage.jsx'
import { mapApiRecipe } from '../utils/recipe.js'

function RecipeDetailPage() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isCurrent = true

    async function loadRecipe() {
      setIsLoading(true)
      setError('')

      try {
        const response = await api.get(`/recipe/getoneRecipe/${id}`)
        if (!response.data.recipe) {
          throw new Error('Recipe not found.')
        }
        if (isCurrent) setRecipe(mapApiRecipe(response.data.recipe))
      } catch (requestError) {
        if (isCurrent) {
          setError(
            requestError.response?.data?.message ||
              requestError.message ||
              'Unable to load this recipe.',
          )
        }
      } finally {
        if (isCurrent) setIsLoading(false)
      }
    }

    loadRecipe()
    return () => {
      isCurrent = false
    }
  }, [id])

  return (
    <main className="min-h-screen bg-[#f3fff7] font-sans text-[#17212b]">
      <header className="bg-[#4caf50] px-4 py-4 text-white shadow-[0_3px_7px_rgba(0,0,0,0.12)]">
        <div className="mx-auto flex max-w-[760px] items-center gap-3">
          <Link
            aria-label="Back to recipes"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15"
            to="/"
          >
            <LuArrowLeft aria-hidden="true" size={21} />
          </Link>
          <LuChefHat aria-hidden="true" size={22} />
          <h1 className="text-[18px] font-semibold">Recipe</h1>
        </div>
      </header>

      <section className="mx-auto max-w-[760px] px-4 py-6">
        {isLoading ? (
          <p className="py-10 text-center text-[14px] text-[#607587]">
            Loading recipe...
          </p>
        ) : error ? (
          <div className="rounded-[18px] bg-white p-6 text-center shadow-sm">
            <p className="text-[14px] text-[#607587]">{error}</p>
            <Link className="mt-4 inline-block text-[#4caf50] hover:underline" to="/">
              Back to recipes
            </Link>
          </div>
        ) : recipe ? (
          <article className="overflow-hidden rounded-[20px] bg-white shadow-[0_3px_8px_rgba(21,49,32,0.14)]">
            {recipe.imageUrl && (
              <div className="h-[220px] overflow-hidden sm:h-[340px]">
                <RecipeImage className="h-full w-full" recipe={recipe} />
              </div>
            )}
            <div className="p-5 sm:p-8">
              <h2 className="text-[24px] font-semibold">{recipe.name}</h2>
              <p className="mt-2 text-[14px] leading-6 text-[#607587]">
                {recipe.description}
              </p>

              {recipe.ingredients.length > 0 && (
                <section className="mt-7" aria-labelledby="recipe-ingredients">
                  <h3
                    className="text-[17px] font-semibold"
                    id="recipe-ingredients"
                  >
                    Ingredients
                  </h3>
                  <ul className="mt-3 list-inside list-disc space-y-2 text-[14px] leading-6 text-[#42515b]">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={`${ingredient}-${index}`}>{ingredient}</li>
                    ))}
                  </ul>
                </section>
              )}

              {recipe.instructions && (
                <section className="mt-7" aria-labelledby="recipe-instructions">
                  <h3
                    className="text-[17px] font-semibold"
                    id="recipe-instructions"
                  >
                    Instructions
                  </h3>
                  <p className="mt-3 whitespace-pre-wrap text-[14px] leading-7 text-[#42515b]">
                    {recipe.instructions}
                  </p>
                </section>
              )}
            </div>
          </article>
        ) : null}
      </section>
    </main>
  )
}

export default RecipeDetailPage
