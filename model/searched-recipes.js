//import functions from the function module
import { buildRecipeCard, combineIdsToString, checkLocalStorageData, clickFavoriteIcon } from '../functions/functions';




let recipeContainer = document.getElementById("random-container");
let searchInput = document.getElementById("search-input");
let heartContainer = [...document.getElementsByClassName("heart-container")];


//check to see if we have recipe data in the local storage
checkLocalStorageData();





//build the view for the search recipes
async function buildSearchedRecipes(ingredients) {

    // let formattedIngredientList = buildIngredientsList(ingredients);


    //get recipes based on ingredients entered
    let searchedRecipes = await getSearchedRecipes(ingredients);

    //now, get more information about those recipes 
    //by passing in their id's as a string separated by a comma
    let idsCommaSeparated = combineIdsToString(searchedRecipes);


    let fullInformationRecipes = await getRecipesByIdInBulk(idsCommaSeparated);


    //let's empty the recipe container
    recipeContainer.innerHTML = "";

    //Now, lets add recipes to the container
    fullInformationRecipes.forEach(recipe => {
        let name = recipe.title;
        let img = recipe.image;
        let time = recipe.readyInMinutes;
        let servings = recipe.servings;
        let id = recipe.id;

        ;

        let card = buildRecipeCard(name, time, servings, img, id);

        let div = document.createElement("div");

        div.innerHTML = card;

        recipeContainer.appendChild(div);

    });


    //get all the recipe cards that have been built
    //we want to add event listeners to the cards favorite icon
    heartContainer = [...document.getElementsByClassName("heart-container")];
    heartContainer.forEach(icon => {
        icon.addEventListener("click", () => {

            clickFavoriteIcon(icon.firstElementChild)
        })
    })

}




//fetch recipes from an API
//based on the ingredients entered
function getSearchedRecipes(ingredients) {
    return fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=72f9b142aa074a93b5f039fbeb9b9ec4&number=1`)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Bad Response");
            }
        })
        .then(data => data)
}


//get a list of recipe information in bulk
//by passing in their id's as a string
//separated by a comma
function getRecipesByIdInBulk(idsString) {
    return fetch(`https://api.spoonacular.com/recipes/informationBulk?ids=${idsString}&apiKey=72f9b142aa074a93b5f039fbeb9b9ec4&number=1`)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Bad Response");
            }
        })
        .then(data => data)
}


//when you click enter
searchInput.addEventListener('keypress', e => {
    if (e.key == 'Enter') {
        //let's get the comma separated list of ingredients
        let ingredients = e.target.value.trim();
        buildSearchedRecipes(ingredients);
        e.preventDefault();
    }
})