import recipeScreenshot from '../assets/screencapture-figma-make-oGK9qyBkMvjV0IZCUXPZ7N-Recipe-Management-App-UI-2026-10-09-16_07_38.png'

function RecipeImage({ recipe, className = '' }) {
  if (recipe.imageUrl) {
    return (
      <img
        alt={`${recipe.name} photo`}
        className={className}
        src={recipe.imageUrl}
      />
    )
  }

  return (
    <svg
      aria-label={`${recipe.name} photo`}
      className={className}
      preserveAspectRatio="none"
      role="img"
      viewBox={recipe.imageView}
    >
      <image
        height="1194"
        href={recipeScreenshot}
        width="1910"
        x="0"
        y="0"
      />
    </svg>
  )
}

export default RecipeImage
