//import functions from the function module
import { buildRecipeCard } from '../functions/functions';




let recipeContainer = document.getElementById("random-container");







//build the view for the random recipes
async function buildRandomRecipes() {
    let randomRecipes = await getRandomRecipes();

    randomRecipes.recipes.forEach(recipe => {
        let name = recipe.title;
        let img = recipe.image;
        let time = recipe.readyInMinutes;
        let servings = recipe.servings;
        let id = recipe.id;

        let card = buildRecipeCard(name, time, servings, img, id);

        let div = document.createElement("div");
        div.innerHTML = card;

        recipeContainer.appendChild(div);

    });


}




//fetch random recipes from an API
function getRandomRecipes() {
    return fetch("https://api.spoonacular.com/recipes/random?apiKey=72f9b142aa074a93b5f039fbeb9b9ec4&number=9")
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Bad Response");
            }
        })
        .then(data => data)
}


buildRandomRecipes();