//dynamically build a recipe card
function buildRecipeCard(name, time, servings, img, id) {
    //checking whether the recipe is a favorite one or not before we build the card
    let isFavorite = isFavoriteRecipe(id);
    //fill color of the icon
    let fillColor = ""

    if (isFavorite) {
        fillColor = "#2622a8";
    }

    //cutting the recipe name if too long
    let recipeName = cutRecipeName(name);
    //img background
    let recipeBackImg = `background:url(${img}) no-repeat center;`

    let card = `<div class="card">
   <div class="card-img" style="${recipeBackImg}">
   </div>
   <div class="text">
       <h1 class="food-name">
           ${recipeName}<span class="tooltip">${name}</span>

       </h1>
       <div class="card-bottom">
           <div class="block-row-col">
               <div class="time"><img class="card-icon" src="/images/schedule_FILL1_wght400_GRAD0_opsz48.png" alt="time" width="20px">
                   <p><span class="accent-text">${time}</span>Mins</p>

               </div>
               <div class="serves"><img class="card-icon" src="/images/people.png" alt="people" width="20px">
                   <p><span class="accent-text">${servings}</span>Serving</p>
               </div>
           </div>
           <a class="heart-container">
           <svg id="${id}" class="heart" data-favorite=${isFavorite} fill="${fillColor}" xmlns="http://www.w3.org/2000/svg" height="48px" width="48px"><path d="m24 41.95-2.05-1.85q-5.3-4.85-8.75-8.375-3.45-3.525-5.5-6.3T4.825 20.4Q4 18.15 4 15.85q0-4.5 3.025-7.525Q10.05 5.3 14.5 5.3q2.85 0 5.275 1.35Q22.2 8 24 10.55q2.1-2.7 4.45-3.975T33.5 5.3q4.45 0 7.475 3.025Q44 11.35 44 15.85q0 2.3-.825 4.55T40.3 25.425q-2.05 2.775-5.5 6.3T26.05 40.1Z"/></svg></a>
       </div>
   </div>
   <a href="#" class="card-btn">View Recipe</a>
</div>`;
    return card;
}







//cut the recipe name if it's too long
function cutRecipeName(name) {
    let nameArray = name.split(" ");
    if (nameArray.length > 3) {
        let newName = `${nameArray[0]} ${nameArray[1]} ${nameArray[2]} ...`;
        return newName;
    }
    return name;

}


//combine the ids of recipes into a string
let combineIdsToString = recipes => {
    return recipes.reduce((acc, recipe, indx) => {
        if (indx != 0) {
            let idWithComma = "," + recipe.id;
            acc += idWithComma;
        } else {
            acc += recipe.id;
        }
        return acc;
    }, "")
}

//changing the comma separated list of ingredients from the client
//into the format required by the API
//Example: If the list from the client is rice,beans,onions
//The API requires the format to be: rice,+beans,+onions
function buildIngredientsList(ingredients) {
    let food = "";
    let arr = ingredients.split("");
    console.log(arr)
    let items = arr.reduce((acc, next, indx) => {
        if (indx === arr.length - 1) {
            food += next;
            acc.push('+' + food);
        } else if (next === ',') {
            acc.push('+' + food);
            food = "";
        } else {
            food += next
        }
        return acc
    }, []);

    let ingredientsList = items.join();
    //removing the first '+' character and returning the string
    return ingredientsList.substring(1);

}

//check whether the recipe is the client's favorite or not
let isFavoriteRecipe = id => {
    //get all the ids from local storage
    let likedRecipeIds = JSON.parse(localStorage.getItem("favoriteRecipesIds"));

    return likedRecipeIds.includes(id)
}


//when you click the favorite icon
let clickFavoriteIcon = icon => {
    //get all the ids from local storage
    let likedRecipeIds = JSON.parse(localStorage.getItem("favoriteRecipesIds"));


    let isFavorite = Boolean(icon.getAttribute("data-favorite"));
    let id = Number(icon.getAttribute("id"));
    let doesIdExist = Boolean(likedRecipeIds.includes(id));




    if (isFavorite && doesIdExist) {
        icon.fill = "";
        //remove the id from the likedRecipesIds array
        let recipeIndx = likedRecipeIds.indexOf(id);

        let newRecipeIds = likedRecipeIds.filter((val, indx) => {
            return indx != recipeIndx;
        })


        //save the new array to the local storage
        localStorage.setItem("favoriteRecipesIds", JSON.stringify(newRecipeIds));

        icon.setAttribute("data-favorite", false);

    }

    //if the recipe is not a favorite one
    console.log(isFavorite);

    if (!isFavorite && !doesIdExist) {
        let color = "#2622a8";
        icon.setAttribute("fill", color);

        likedRecipeIds.push(id);


        //save the array to the local storage
        localStorage.setItem("favoriteRecipesIds", JSON.stringify(likedRecipeIds));

        icon.setAttribute("data-favorite", true);






    }

    // if (event.target)

}


//checking to see if we have recipe data in the local storage
//if not, we add new data
let checkLocalStorageData = () => {
    //get all the ids from local storage

    let storagerRecipeData = JSON.parse(localStorage.getItem("favoriteRecipesIds"));

    //if we don't have any recipe data
    if (!storagerRecipeData) {
        storagerRecipeData = [];
        //save the array to the local storage
        localStorage.setItem("favoriteRecipesIds", JSON.stringify(storagerRecipeData));
    }
}


export { buildRecipeCard, combineIdsToString, checkLocalStorageData, clickFavoriteIcon };