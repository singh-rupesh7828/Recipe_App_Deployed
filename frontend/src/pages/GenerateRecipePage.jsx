import { useState } from 'react'
import {
  LuArrowLeft,
  LuChefHat,
  LuSparkles,
  LuX,
} from 'react-icons/lu'
import { Link } from 'react-router-dom'
import GeneratedRecipeCard from '../components/GeneratedRecipeCard.jsx'
import MainNavigation from '../components/MainNavigation.jsx'
import api from '../axios'

function GenerateRecipePage() {
  const [ingredientInput, setIngredientInput] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [generatedRecipe, setGeneratedRecipe] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  function addIngredient(event) {
    event.preventDefault()

    const ingredient = ingredientInput.trim()
    if (!ingredient) return

    setIngredients((currentIngredients) => {
      if (
        currentIngredients.some(
          (existing) => existing.toLowerCase() === ingredient.toLowerCase(),
        )
      ) {
        return currentIngredients
      }

      return [...currentIngredients, ingredient]
    })

    setErrorMessage('')
    setIngredientInput('')
  }

  function removeIngredient(ingredientToRemove) {
    setIngredients((currentIngredients) =>
      currentIngredients.filter((ingredient) => ingredient !== ingredientToRemove),
    )
  }

  async function generateRecipe() {
    if (!ingredients.length || isGenerating) return

    setErrorMessage('')
    setGeneratedRecipe('')
    setIsGenerating(true)

    try {
      const { data } = await api.post('/recipe/GenrateRecipe', { ingredients })
      const recipe = data?.recipe

      if (typeof recipe !== 'string' || !recipe.trim()) {
        throw new Error('The server returned an empty recipe. Please try again.')
      }

      setGeneratedRecipe(recipe)
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message ||
          error.message ||
          'Unable to generate a recipe. Please try again.',
      )
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f3fff7] font-sans text-[#17212b]">
      <header className="px-3 pb-[14px] pt-3 md:px-5 md:pb-4">
        <div className="mx-auto flex h-[58px] max-w-[1188px] items-center justify-between rounded-[15px] border border-[#d8efdc] bg-white px-3 shadow-[0_5px_9px_rgba(22,54,32,0.12)] md:h-[62px] md:px-[18px]">
          <Link
            aria-label="My Recipes home"
            className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#4caf50] text-white md:h-[38px] md:w-auto md:gap-[10px] md:rounded-none md:bg-transparent md:text-[#37434b]"
            to="/"
          >
            <span className="flex items-center justify-center md:h-[38px] md:w-[38px] md:rounded-full md:bg-[#4caf50]">
              <LuChefHat aria-hidden="true" size={21} />
            </span>
            <span className="hidden text-[14px] font-semibold md:inline">
              My Recipes
            </span>
          </Link>

          <MainNavigation layout="compact" />
        </div>
      </header>

      <div className="flex h-[56px] items-center gap-[13px] bg-[#4caf50] px-[17px] text-white shadow-[0_3px_6px_rgba(0,0,0,0.12)] md:h-[59px] md:px-[18px]">
        <Link
          aria-label="Back to recipes"
          className="flex items-center"
          to="/"
        >
          <LuArrowLeft aria-hidden="true" size={21} strokeWidth={2} />
        </Link>
        <h1 className="text-[17px] font-semibold leading-6 md:text-[20px]">
          Generate Recipe
        </h1>
      </div>

      <section className="mx-auto w-[calc(100%-48px)] max-w-[760px] pb-10 pt-[21px] md:pt-[22px]">
        <div className="mx-auto w-full max-w-[386px]">
          <div className="flex min-h-[179px] flex-col items-center justify-center rounded-[16px] border-2 border-[#c9e9cc] bg-[#e8f5e9] px-4 py-[18px] text-center md:min-h-[191px]">
            <span className="mb-[16px] flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#c8e6c9] text-[#4caf50] md:mb-[17px] md:h-[60px] md:w-[60px]">
              <LuChefHat aria-hidden="true" size={29} strokeWidth={2} />
            </span>
            <h2 className="text-[16px] font-semibold leading-5">
              Let AI Create Your Recipe
            </h2>
            <p className="mt-[10px] max-w-[340px] text-[13px] leading-[18px] text-[#607987]">
              Enter the ingredients you have and we&apos;ll suggest delicious
              recipes
            </p>
          </div>

          <form className="mt-[23px]" onSubmit={addIngredient}>
            <label
              className="mb-[11px] block text-[14px] font-semibold leading-5"
              htmlFor="recipe-ingredient"
            >
              Your Ingredients
            </label>
            <div className="flex gap-[8px]">
              <input
                autoComplete="off"
                className="h-[44px] min-w-0 flex-1 rounded-[16px] border border-[#d7edda] bg-[#fbfffd] px-[14px] text-[14px] text-[#26343d] outline-none placeholder:text-[#8b9aa5] focus:border-[#91ce98] focus:ring-2 focus:ring-[#c8e6c9]/60 md:h-[46px]"
                id="recipe-ingredient"
                onChange={(event) => setIngredientInput(event.target.value)}
                placeholder="Type ingredient and press Enter..."
                value={ingredientInput}
              />
              <button
                className="h-[44px] w-[69px] shrink-0 rounded-[17px] bg-[#9fd5a4] text-[14px] font-semibold text-white transition-colors hover:bg-[#83c98b] disabled:cursor-not-allowed md:h-[46px] md:w-[73px]"
                disabled={!ingredientInput.trim()}
                type="submit"
              >
                Add
              </button>
            </div>
          </form>

          {ingredients.length > 0 && (
            <ul
              aria-label="Added ingredients"
              className="mt-3 flex flex-wrap gap-2"
            >
              {ingredients.map((ingredient) => (
                <li
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f5e9] px-3 py-1.5 text-[13px] text-[#3d8e46]"
                  key={ingredient}
                >
                  {ingredient}
                  <button
                    aria-label={`Remove ${ingredient}`}
                    className="rounded-full hover:bg-[#c8e6c9]"
                    onClick={() => removeIngredient(ingredient)}
                    type="button"
                  >
                    <LuX aria-hidden="true" size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button
            className="mt-[21px] flex h-[50px] w-full items-center justify-center gap-2 rounded-[16px] bg-[#9fd5a4] text-[15px] font-semibold text-white shadow-[0_3px_5px_rgba(0,0,0,0.12)] transition-colors enabled:bg-[#4caf50] enabled:hover:bg-[#43a047] disabled:cursor-not-allowed md:mt-[22px] md:h-[52px] md:text-[16px]"
            disabled={ingredients.length === 0 || isGenerating}
            onClick={generateRecipe}
            type="button"
          >
            <LuSparkles aria-hidden="true" size={19} />
            {isGenerating ? 'Generating...' : 'Generate Recipe'}
          </button>

          {errorMessage && (
            <p
              aria-live="polite"
              className="mt-3 text-center text-[13px] leading-5 text-[#607987]"
            >
              {errorMessage}
            </p>
          )}
        </div>

        {generatedRecipe && (
          <div aria-live="polite" className="mt-6">
            <GeneratedRecipeCard recipe={generatedRecipe} />
          </div>
        )}
      </section>
    </main>
  )
}

export default GenerateRecipePage
