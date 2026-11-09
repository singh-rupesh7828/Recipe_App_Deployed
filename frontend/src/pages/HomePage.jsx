import { useEffect } from 'react'
import {
  LuChefHat,
  LuLogIn,
  LuPlus,
  LuSparkles,
} from 'react-icons/lu'
import { Link } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation.jsx'
import RecipeImage from '../components/RecipeImage.jsx'

function RecipeCard({ recipe }) {
  return (
    <article className="relative overflow-hidden rounded-[20px] bg-white shadow-[0_3px_5px_rgba(21,49,32,0.16)] ring-1 ring-black/3">
      <Link className="block" to={`/recipes/${recipe.id}`}>
        <div className="relative aspect-[1.95/1] overflow-hidden md:aspect-[1.84/1]">
          <RecipeImage className="h-full w-full" recipe={recipe} />
          {recipe.generated && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#4caf50] px-3 py-1.5 text-[11px] font-medium text-white shadow-sm">
              <LuSparkles aria-hidden="true" size={13} />
              AI Generated
            </span>
          )}
        </div>
        <div className="px-4.5 pb-4.25 pt-4.75 md:px-4.25 md:pb-4.5 md:pt-4">
          <h2 className="text-[16px] font-semibold leading-5.25 text-[#18212a] md:text-[14px] md:leading-5">
            {recipe.name}
          </h2>
          <p className="mt-2.25 text-[13px] leading-4.5 text-[#607587] md:mt-2 md:text-[12px] md:leading-4.25">
            {recipe.description}
          </p>
        </div>
      </Link>
    </article>
  )
}

function HomePage({ onLoadRecipes, recipes, recipesError, recipesLoading }) {
  useEffect(() => {
    onLoadRecipes()
  }, [onLoadRecipes])

  return (
    <main className="min-h-screen bg-[#f3fff7] font-sans text-[#17212b]">
      <header className="bg-[#4caf50] px-3.5 pb-5.25 pt-5 shadow-[0_3px_7px_rgba(0,0,0,0.12)] md:px-3.5 md:pb-5 md:pt-5">
        <div className="flex h-10.25 items-center justify-between md:h-10">
          <div className="flex items-center gap-3">
            <span className="flex h-10.5 w-10.5 items-center justify-center rounded-[14px] bg-white text-[#4caf50] shadow-sm">
              <LuChefHat aria-hidden="true" size={23} strokeWidth={2} />
            </span>
            <div className="text-white">
              <h1 className="text-[20px] font-semibold leading-6">
                My Recipes
              </h1>
              <p className="mt-0.5 text-[12px] leading-4">
                Delicious meals await
              </p>
            </div>
          </div>
          <Link
            aria-label="Log in"
            className="flex h-8.5 w-9.75 items-center justify-center rounded-full bg-white text-[#4caf50] md:h-9.5 md:w-auto md:gap-1.5 md:px-3.25 md:text-[12px]"
            to="/login"
          >
            <LuLogIn aria-hidden="true" size={16} />
            <span className="hidden md:inline">Log in</span>
          </Link>
        </div>

        <MainNavigation />
      </header>

      <section
        aria-label="Your recipes"
        className="mx-auto grid max-w-257.5 grid-cols-1 gap-5 px-3.5 pb-8 pt-5.5 md:grid-cols-3 md:gap-4.5 md:px-0 md:pt-5"
      >
        {recipesError ? (
          <div className="col-span-full rounded-[18px] bg-white px-5 py-8 text-center text-[14px] text-[#607587] shadow-sm">
            <p>{recipesError}</p>
            {recipesError.toLowerCase().includes('token') ||
            recipesError.toLowerCase().includes('signin') ||
            recipesError.toLowerCase().includes('sign in') ? (
              <Link
                className="mt-3 inline-flex text-[#4caf50] hover:underline"
                to="/login"
              >
                Log in to view your recipes
              </Link>
            ) : (
              <button
                className="mt-3 text-[#4caf50] hover:underline"
                onClick={onLoadRecipes}
                type="button"
              >
                Try again
              </button>
            )}
          </div>
        ) : recipesLoading ? (
          <p className="col-span-full py-8 text-center text-[14px] text-[#607587]">
            Loading recipes...
          </p>
        ) : recipes.length > 0 ? (
          recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
        ) : (
          <p className="col-span-full rounded-[18px] bg-white px-5 py-8 text-center text-[14px] text-[#607587] shadow-sm">
            You don&apos;t have any saved recipes yet.
          </p>
        )}
      </section>

      <Link
        aria-label="Add a recipe"
        className="fixed bottom-8.75 right-5.5 flex h-14 w-14 items-center justify-center rounded-full bg-[#4caf50] text-white shadow-[0_5px_12px_rgba(0,0,0,0.16)] transition-transform hover:scale-105 md:bottom-7.25 md:right-5 md:h-13 md:w-13"
        to="/add"
      >
        <LuPlus aria-hidden="true" size={25} strokeWidth={1.8} />
      </Link>
    </main>
  )
}

export default HomePage
