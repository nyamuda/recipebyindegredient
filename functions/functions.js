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
           <a class="heart-container heart-link" href="#">
           <svg id="${id}" class="heart" data-favorite=${isFavorite} fill="${fillColor}" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 21.275-1.6-1.425q-2.55-2.3-4.212-3.963Q4.525 14.225 3.55 12.9q-.975-1.325-1.362-2.45Q1.8 9.325 1.8 8.15q0-2.45 1.625-4.075T7.5 2.45q1.3 0 2.463.525 1.162.525 2.037 1.5.85-.975 2.025-1.5Q15.2 2.45 16.5 2.45q2.425 0 4.062 1.625Q22.2 5.7 22.2 8.15q0 1.175-.388 2.288-.387 1.112-1.362 2.437-.975 1.325-2.65 3-1.675 1.675-4.225 3.975Z"/></svg>
           </a>
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


    let isFavorite = icon.getAttribute("data-favorite");
    let id = Number(icon.getAttribute("id"));
    let doesIdExist = likedRecipeIds.includes(id);
    let color = "#2622a8";




    if (isFavorite == "true" && doesIdExist) {
        //change color of the icon
        color = "";

        icon.removeAttribute("fill");;
        icon.setAttribute("fill", color);
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
    console.log(icon);
    console.log(doesIdExist);


    if (isFavorite == "false" && !doesIdExist) {
        //change the color of the icon
        icon.removeAttribute("fill");;
        icon.setAttribute("fill", color);

        //add the id of the recipe to the liked recipes array
        likedRecipeIds.push(id);


        //save the array to the local storage
        localStorage.setItem("favoriteRecipesIds", JSON.stringify(likedRecipeIds));
        icon.setAttribute("data-favorite", true);






    }

    // if (event.target)

}




//checking to see if we have recipe data in the local storage
//if not, we add new data ---an empty array
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