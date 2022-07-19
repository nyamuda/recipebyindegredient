import {
    buildRecipeDetailsView,
    buildRecipeInstructions,
    buildRecipeIngredients,
    getParams,
    checkLocalStorageData,
    clickFavoriteIcon,

    buildFavRecipesList
} from '../functions/functions';
import { getRecipeById } from '../model/details-model';




//CHECK TO SEE IF WE HAVE RECIPE DATA IN THE LOCAL STORAGE
//IF WE DON'T, WE ADD AN EMPTY ARRAY
checkLocalStorageData();




//BUILD ALL THE HTML INFORMATION FOR A PARTICULAR RECIPE
//THIS IS FOR THE RECIPE-DETAILS PAGE

async function buildRecipeDetails() {


    // Get the value of "id" in eg "https://recipe-details.com/?id=value"
    let recipeId = Number(getParams["id"].trim());


    //get the recipe info by id
    let recipeInformation = await getRecipeById(recipeId);

    //use the info to build the HTML 
    let name = recipeInformation["title"];
    let time = recipeInformation["readyInMinutes"];
    let servings = recipeInformation["servings"];
    let img = recipeInformation["image"];
    let id = recipeInformation["id"];
    let author = recipeInformation["sourceName"];

    //sometimes author is not available ---> null
    if (!author) {
        author = "";
    } else {
        author = "By " + author;
    }
    buildRecipeDetailsView(name, time, servings, img, id, author);

    //build ingredients
    let ingredients = recipeInformation["extendedIngredients"];

    buildRecipeIngredients(ingredients);

    //build instructions
    let instructions = recipeInformation["analyzedInstructions"][0]['steps'];
    console.log(recipeInformation);
    console.log(instructions);
    buildRecipeInstructions(instructions);


    //Add an event listeners to the page favorite icon -- the heart
    listenToYourHeart()
}



//ADD AN EVENT LISTENER TO THE FAVORITE ICON --THE HEART
function listenToYourHeart() {

    let heartParent = document.getElementById("heart-parent");
    heartParent.addEventListener("click", (e) => {
        clickFavoriteIcon(heartParent.firstElementChild);
        e.preventDefault();
    })
}


buildRecipeDetails()