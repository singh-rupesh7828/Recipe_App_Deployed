export function mapApiRecipe(recipe) {
  return {
    id: recipe._id,
    name: recipe.title,
    description: recipe.discription,
    imageUrl: recipe.image?.url || '',
    imageView: '0 0 1 1',
    ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
    instructions: recipe.recipe || '',
    generated: false,
  }
}
