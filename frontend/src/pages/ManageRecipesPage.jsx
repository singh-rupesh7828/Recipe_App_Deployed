import { useEffect, useState } from 'react'
import {
  LuArrowLeft,
  LuChefHat,
  LuPencil,
  LuSearch,
  LuTrash2,
  LuX,
} from 'react-icons/lu'
import { Link } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation.jsx'
import RecipeImage from '../components/RecipeImage.jsx'

function ManageRecipesPage({
  onDeleteRecipe,
  onLoadRecipes,
  onUpdateRecipe,
  recipes,
  recipesError,
  recipesLoading,
}) {
  const [search, setSearch] = useState('')
  const [editingRecipe, setEditingRecipe] = useState(null)
  const [actionError, setActionError] = useState('')

  useEffect(() => {
    onLoadRecipes()
  }, [onLoadRecipes])

  const query = search.trim().toLowerCase()
  const filteredRecipes = recipes.filter(
    ({ name, description }) =>
      name.toLowerCase().includes(query) ||
      description.toLowerCase().includes(query),
  )

  async function saveRecipe(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name')).trim()
    const description = String(formData.get('description')).trim()

    if (!name || !description) return

    setActionError('')
    try {
      await onUpdateRecipe({ ...editingRecipe, name, description })
      setEditingRecipe(null)
    } catch (error) {
      setActionError(
        error.response?.data?.message ||
          'Unable to update this recipe. Please try again.',
      )
    }
  }

  async function deleteRecipe(recipe) {
    if (window.confirm(`Delete "${recipe.name}"?`)) {
      setActionError('')
      try {
        await onDeleteRecipe(recipe.id)
      } catch (error) {
        setActionError(
          error.response?.data?.message ||
            'Unable to delete this recipe. Please try again.',
        )
      }
    }
  }

  return (
    <main className="min-h-screen bg-[#f3fff7] font-sans text-[#17212b]">
      <header className="px-3 pb-[14px] pt-3 md:px-5 md:pb-3 md:pt-[10px]">
        <div className="mx-auto flex h-[58px] max-w-[1188px] items-center justify-between rounded-[15px] border border-[#d8efdc] bg-white px-3 shadow-[0_5px_9px_rgba(22,54,32,0.12)] md:h-[50px] md:px-[14px]">
          <Link
            aria-label="My Recipes home"
            className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#4caf50] text-white md:h-[30px] md:w-auto md:gap-[8px] md:rounded-none md:bg-transparent md:text-[#37434b]"
            to="/"
          >
            <span className="flex items-center justify-center md:h-[30px] md:w-[30px] md:rounded-full md:bg-[#4caf50]">
              <LuChefHat aria-hidden="true" size={19} />
            </span>
            <span className="hidden text-[12px] font-semibold md:inline">
              My Recipes
            </span>
          </Link>
          <MainNavigation layout="compact" />
          <span className="w-[36px] md:hidden" />
        </div>
      </header>

      <section className="bg-[#4caf50] px-[14px] pb-[14px] pt-[2px] text-white shadow-[0_3px_6px_rgba(0,0,0,0.12)] md:px-[12px] md:pb-[11px] md:pt-0">
        <div className="flex h-[47px] items-center gap-[11px] md:h-[48px]">
          <Link aria-label="Back to recipes" className="flex items-center" to="/">
            <LuArrowLeft aria-hidden="true" size={20} />
          </Link>
          <h1 className="text-[17px] font-semibold md:text-[16px]">
            Manage Recipes
          </h1>
        </div>
        <label className="flex h-[48px] items-center gap-[11px] rounded-[15px] bg-white px-[14px] text-[#607987] shadow-[0_2px_4px_rgba(0,0,0,0.08)] md:h-[42px] md:rounded-[12px]">
          <LuSearch aria-hidden="true" size={18} />
          <span className="sr-only">Search recipes</span>
          <input
            className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#17212b] outline-none placeholder:text-[#8b9aa5] md:text-[12px]"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search recipes..."
            type="search"
            value={search}
          />
        </label>
      </section>

      <section
        aria-label="Manage your recipes"
        className="mx-auto flex max-w-[638px] flex-col gap-[16px] px-[14px] pb-8 pt-[22px] md:max-w-[636px] md:gap-[13px] md:px-0 md:pt-[18px]"
      >
        {(actionError || recipesError) && (
          <p aria-live="polite" className="text-center text-[13px] text-red-600">
            {actionError || recipesError}
          </p>
        )}
        {recipesLoading && (
          <p className="py-4 text-center text-[14px] text-[#607587]">
            Loading recipes...
          </p>
        )}
        {filteredRecipes.map((recipe) => (
          <article
            className="rounded-[21px] bg-white p-[14px] shadow-[0_3px_5px_rgba(21,49,32,0.16)] ring-1 ring-black/[0.03] md:flex md:min-h-[120px] md:items-center md:gap-[12px] md:rounded-[19px] md:p-[12px]"
            key={recipe.id}
          >
            <div className="relative h-[112px] overflow-hidden rounded-[15px] md:h-[96px] md:w-[94px] md:shrink-0">
              <RecipeImage className="h-full w-full" recipe={recipe} />
              {recipe.generated && (
                <span className="absolute left-[7px] top-[7px] rounded-full bg-[#4caf50] px-[7px] py-[3px] text-[10px] font-medium text-white">
                  AI
                </span>
              )}
            </div>

            <div className="mt-[17px] md:mt-0 md:min-w-0 md:flex-1">
              <h2 className="text-[15px] font-semibold leading-5 md:text-[14px]">
                {recipe.name}
              </h2>
              <p className="mt-[6px] text-[12px] leading-[17px] text-[#607587]">
                {recipe.description}
              </p>
            </div>

            <div className="mt-[11px] flex justify-end gap-[8px] md:mt-0 md:w-[72px] md:shrink-0 md:flex-col md:gap-[6px]">
              <button
                className="inline-flex h-[35px] items-center gap-[6px] rounded-full bg-[#4caf50] px-[13px] text-[12px] font-medium text-white shadow-sm transition-colors hover:bg-[#43a047] md:h-[32px] md:justify-center md:px-[10px]"
                onClick={() => setEditingRecipe(recipe)}
                type="button"
              >
                <LuPencil aria-hidden="true" size={14} />
                Edit
              </button>
              <button
                className="inline-flex h-[35px] items-center gap-[6px] rounded-full bg-[#f44343] px-[13px] text-[12px] font-medium text-white shadow-sm transition-colors hover:bg-[#e53935] md:h-[32px] md:justify-center md:px-[10px]"
                onClick={() => deleteRecipe(recipe)}
                type="button"
              >
                <LuTrash2 aria-hidden="true" size={14} />
                Delete
              </button>
            </div>
          </article>
        ))}

        {filteredRecipes.length === 0 && (
          <p className="rounded-[18px] bg-white px-5 py-8 text-center text-[14px] text-[#607587] shadow-sm">
            {recipes.length === 0
              ? 'You have no recipes to manage.'
              : 'No recipes match your search.'}
          </p>
        )}
      </section>

      {editingRecipe && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center bg-[#17212b]/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setEditingRecipe(null)
          }}
        >
          <form
            aria-labelledby="edit-recipe-title"
            className="w-full max-w-[420px] rounded-[20px] bg-white p-5 shadow-xl"
            onSubmit={saveRecipe}
            role="dialog"
            aria-modal="true"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2
                className="text-[18px] font-semibold"
                id="edit-recipe-title"
              >
                Edit Recipe
              </h2>
              <button
                aria-label="Close edit form"
                className="rounded-full p-2 text-[#607987] hover:bg-[#f3fff7]"
                onClick={() => setEditingRecipe(null)}
                type="button"
              >
                <LuX aria-hidden="true" size={18} />
              </button>
            </div>
            <label className="mb-4 block text-[13px] font-medium" htmlFor="recipe-name">
              Recipe name
              <input
                className="mt-2 h-[44px] w-full rounded-[12px] border border-[#d7edda] px-3 text-[14px] outline-none focus:border-[#91ce98]"
                defaultValue={editingRecipe.name}
                id="recipe-name"
                name="name"
                required
              />
            </label>
            <label
              className="mb-5 block text-[13px] font-medium"
              htmlFor="recipe-description"
            >
              Description
              <textarea
                className="mt-2 min-h-[88px] w-full resize-y rounded-[12px] border border-[#d7edda] p-3 text-[14px] outline-none focus:border-[#91ce98]"
                defaultValue={editingRecipe.description}
                id="recipe-description"
                name="description"
                required
              />
            </label>
            <div className="flex justify-end gap-2">
              <button
                className="h-[40px] rounded-full px-4 text-[13px] text-[#607987] hover:bg-[#f3fff7]"
                onClick={() => setEditingRecipe(null)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="h-[40px] rounded-full bg-[#4caf50] px-5 text-[13px] font-medium text-white hover:bg-[#43a047]"
                type="submit"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  )
}

export default ManageRecipesPage
