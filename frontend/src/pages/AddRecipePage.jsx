import { useState } from 'react'
import { LuArrowLeft, LuChefHat, LuPlus, LuUpload, LuX } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation.jsx'

function AddRecipePage({ onAddRecipe }) {
  const navigate = useNavigate()
  const [ingredients, setIngredients] = useState([''])
  const [steps, setSteps] = useState([''])
  const [imageUrl, setImageUrl] = useState('')
  const [imageName, setImageName] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageFile, setImageFile] = useState(null)

  function handleImageChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.')
      event.target.value = ''
      return
    }

    setImageUrl(URL.createObjectURL(file))
    setImageName(file.name)
    setImageFile(file)
    event.target.value = ''
    setError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('title')).trim()
    const description = String(formData.get('description')).trim()
    const cleanIngredients = ingredients
      .map((ingredient) => ingredient.trim())
      .filter(Boolean)
    const cleanSteps = steps.map((step) => step.trim()).filter(Boolean)

    if (!name || !description) {
      setError('Please enter a recipe title and description.')
      return
    }

    if (!imageFile) {
      setError('Please select a recipe image.')
      return
    }

    if (cleanIngredients.length === 0 || cleanSteps.length === 0) {
      setError('Please enter at least one ingredient and one cooking step.')
      return
    }

    const recipeData = new FormData()
    recipeData.append('title', name)
    recipeData.append('discription', description)
    recipeData.append('ingredients', JSON.stringify(cleanIngredients))
    recipeData.append('recipe', cleanSteps.join('\n'))
    recipeData.append('image', imageFile)

    setIsSubmitting(true)
    setError('')
    try {
      await onAddRecipe(recipeData)
      form.reset()
      setIngredients([''])
      setSteps([''])
      setImageUrl('')
      setImageName('')
      setImageFile(null)
      navigate('/')
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          'Unable to save this recipe. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  function updateRow(setRows, index, value) {
    setRows((currentRows) =>
      currentRows.map((row, rowIndex) => (rowIndex === index ? value : row)),
    )
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
        <Link aria-label="Back to recipes" className="flex items-center" to="/">
          <LuArrowLeft aria-hidden="true" size={21} strokeWidth={2} />
        </Link>
        <h1 className="text-[17px] font-semibold leading-6 md:text-[20px]">
          Add Recipe
        </h1>
      </div>

      <form
        className="mx-auto w-[calc(100%-48px)] max-w-[520px] pb-[30px] pt-[22px] md:pt-[34px]"
        onSubmit={handleSubmit}
      >
        <label
          className="mb-[20px] block text-[14px] font-semibold leading-5"
          htmlFor="recipe-title"
        >
          Recipe Title
          <input
            className="mt-[10px] h-[44px] w-full rounded-[18px] border border-[#d7edda] bg-[#fbfffd] px-[14px] text-[14px] font-normal text-[#26343d] outline-none placeholder:text-[#8b9aa5] focus:border-[#91ce98] focus:ring-2 focus:ring-[#c8e6c9]/60 md:h-[62px] md:px-[20px] md:text-[16px]"
            id="recipe-title"
            name="title"
            placeholder="Enter recipe name..."
            required
          />
        </label>

        <label
          className="mb-[20px] block text-[14px] font-semibold leading-5"
          htmlFor="recipe-description"
        >
          Description
          <textarea
            className="mt-[10px] min-h-[86px] w-full resize-y rounded-[18px] border border-[#d7edda] bg-[#fbfffd] px-[14px] py-[13px] text-[14px] font-normal text-[#26343d] outline-none placeholder:text-[#8b9aa5] focus:border-[#91ce98] focus:ring-2 focus:ring-[#c8e6c9]/60 md:min-h-[122px] md:px-[20px] md:py-[17px] md:text-[16px]"
            id="recipe-description"
            name="description"
            placeholder="Brief description..."
            required
          />
        </label>

        <div className="mb-[20px]">
          <p className="mb-[10px] text-[14px] font-semibold leading-5">
            Recipe Image
          </p>
          <label className="flex min-h-[111px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[18px] border-2 border-dashed border-[#d7edda] bg-[#fbfffd] text-center text-[#607987] transition-colors hover:border-[#91ce98] md:min-h-[159px]">
            {imageUrl ? (
              <img
                alt="Recipe preview"
                className="h-[111px] w-full object-cover md:h-[159px]"
                src={imageUrl}
              />
            ) : (
              <>
                <LuUpload aria-hidden="true" size={28} />
                <span className="mt-[10px] text-[14px]">
                  Click to upload image
                </span>
              </>
            )}
            <input
              accept="image/*"
              className="sr-only"
              onChange={handleImageChange}
              name="image"
              type="file"
            />
          </label>
          {imageName && (
            <div className="mt-2 flex items-center justify-between gap-2 text-[12px] text-[#607587]">
              <span className="truncate">{imageName}</span>
              <button
                aria-label="Remove selected image"
                className="rounded-full p-1 hover:bg-[#e8f5e9]"
                onClick={() => {
                  setImageUrl('')
                  setImageName('')
                  setImageFile(null)
                }}
                type="button"
              >
                <LuX aria-hidden="true" size={16} />
              </button>
            </div>
          )}
        </div>

        <section className="mb-[20px]" aria-labelledby="ingredients-title">
          <div className="mb-[10px] flex items-center justify-between">
            <h2
              className="text-[14px] font-semibold leading-5"
              id="ingredients-title"
            >
              Ingredients
            </h2>
            <button
              className="inline-flex items-center gap-1 text-[14px] font-medium text-[#4caf50]"
              onClick={() => setIngredients((current) => [...current, ''])}
              type="button"
            >
              <LuPlus aria-hidden="true" size={17} />
              Add
            </button>
          </div>
          <div className="space-y-[9px]">
            {ingredients.map((ingredient, index) => (
              <div className="flex items-center gap-2" key={index}>
                <input
                  aria-label={`Ingredient ${index + 1}`}
                  className="h-[44px] min-w-0 flex-1 rounded-full border border-[#d7edda] bg-[#fbfffd] px-[14px] text-[14px] text-[#26343d] outline-none placeholder:text-[#8b9aa5] focus:border-[#91ce98]"
                  onChange={(event) =>
                    updateRow(setIngredients, index, event.target.value)
                  }
                  placeholder={`Ingredient ${index + 1}`}
                  value={ingredient}
                />
                {ingredients.length > 1 && (
                  <button
                    aria-label={`Remove ingredient ${index + 1}`}
                    className="rounded-full p-2 text-[#607987] hover:bg-[#e8f5e9]"
                    onClick={() =>
                      setIngredients((current) =>
                        current.filter((_, rowIndex) => rowIndex !== index),
                      )
                    }
                    type="button"
                  >
                    <LuX aria-hidden="true" size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-[20px]" aria-labelledby="steps-title">
          <div className="mb-[10px] flex items-center justify-between">
            <h2 className="text-[14px] font-semibold leading-5" id="steps-title">
              Steps
            </h2>
            <button
              className="inline-flex items-center gap-1 text-[14px] font-medium text-[#4caf50]"
              onClick={() => setSteps((current) => [...current, ''])}
              type="button"
            >
              <LuPlus aria-hidden="true" size={17} />
              Add
            </button>
          </div>
          <div className="space-y-[9px]">
            {steps.map((step, index) => (
              <div className="flex items-start gap-[9px]" key={index}>
                <span className="mt-[9px] flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-[#e8f5e9] text-[14px] text-[#4caf50]">
                  {index + 1}
                </span>
                <textarea
                  aria-label={`Step ${index + 1} instructions`}
                  className="min-h-[65px] min-w-0 flex-1 resize-y rounded-[20px] border border-[#d7edda] bg-[#fbfffd] px-[14px] py-[13px] text-[14px] text-[#26343d] outline-none placeholder:text-[#8b9aa5] focus:border-[#91ce98] md:min-h-[92px] md:px-[20px] md:py-[18px]"
                  onChange={(event) =>
                    updateRow(setSteps, index, event.target.value)
                  }
                  placeholder={`Step ${index + 1} instructions...`}
                  value={step}
                />
                {steps.length > 1 && (
                  <button
                    aria-label={`Remove step ${index + 1}`}
                    className="mt-4 rounded-full p-2 text-[#607987] hover:bg-[#e8f5e9]"
                    onClick={() =>
                      setSteps((current) =>
                        current.filter((_, rowIndex) => rowIndex !== index),
                      )
                    }
                    type="button"
                  >
                    <LuX aria-hidden="true" size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {error && (
          <p aria-live="polite" className="mb-3 text-center text-[13px] text-red-600">
            {error}
          </p>
        )}
        <button
          className="h-[49px] w-full rounded-[17px] bg-[#4caf50] text-[15px] font-semibold text-white shadow-[0_3px_5px_rgba(0,0,0,0.15)] transition-colors hover:bg-[#43a047] disabled:cursor-not-allowed disabled:opacity-70 md:h-[70px] md:text-[17px]"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? 'Saving recipe...' : 'Save Recipe'}
        </button>
      </form>
    </main>
  )
}

export default AddRecipePage
