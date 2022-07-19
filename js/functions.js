/*------------------------------------*\
  # THE HOME  PAGE
\*------------------------------------*/


//DYNAMICALLY BUILD A RECIPE CARD
export function buildRecipeCard(name, time, servings, img, id) {
    //checking whether the recipe is a favorite one or not before we build the card
    let isFavorite = isFavoriteRecipe(id);
    //fill color of the icon
    let fillColor = ""

    if (isFavorite) {
        fillColor = "#2622a8";
    }

    let cardJSON = JSON.stringify({ name, time, servings, img, id });



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
           <svg id="${id}" class="heart" data-info='${cardJSON}' data-favorite=${isFavorite} fill="${fillColor}" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 21.275-1.6-1.425q-2.55-2.3-4.212-3.963Q4.525 14.225 3.55 12.9q-.975-1.325-1.362-2.45Q1.8 9.325 1.8 8.15q0-2.45 1.625-4.075T7.5 2.45q1.3 0 2.463.525 1.162.525 2.037 1.5.85-.975 2.025-1.5Q15.2 2.45 16.5 2.45q2.425 0 4.062 1.625Q22.2 5.7 22.2 8.15q0 1.175-.388 2.288-.387 1.112-1.362 2.437-.975 1.325-2.65 3-1.675 1.675-4.225 3.975Z"/></svg>
           </a>
       </div>
   </div>
   <a href='view/recipe-details.html?id=${id}' class="card-btn">View Recipe</a>
</div>`;
    return card;
}





//CUT THE RECIPE NAME IF IT'S TOOL LONG
function cutRecipeName(name) {
    let nameArray = name.split(" ");
    if (nameArray.length > 3) {
        let newName = `${nameArray[0]} ${nameArray[1]} ${nameArray[2]} ...`;
        return newName;
    }
    return name;

}


//COMBINE THE IDs OF RECIPES INTO A STRING
export let combineIdsToString = recipes => {
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



//CHECK WHETHER THE RECIPE IS A CLIENT'S FAVORITE OR NOT
let isFavoriteRecipe = id => {
    //get all the favorite recipes from local storage
    let likedRecipes = JSON.parse(localStorage.getItem("favoriteRecipes"));


    //get the ids of those favorite recipes
    let likedRecipeIds = likedRecipes.map(recipe => recipe['id']);



    return likedRecipeIds.includes(id)
}








//WHEN YOU CLICK THE FAVORITE ICON
export let clickFavoriteIcon = icon => {
    //get all the favorite recipes from local storage
    let likedRecipes = JSON.parse(localStorage.getItem("favoriteRecipes"));

    //get the ids of those favorite recipes
    let likedRecipeIds = likedRecipes.map(recipe => recipe.id);

    let isFavorite = icon.getAttribute("data-favorite");
    let recipeInfo = JSON.parse(icon.getAttribute("data-info"));

    let id = Number(icon.getAttribute("id"));
    let doesIdExist = likedRecipeIds.includes(id);
    let color = "#2622a8";




    if (isFavorite == "true" && doesIdExist) {
        //change color of the icon
        color = "";

        icon.removeAttribute("fill");;
        icon.setAttribute("fill", color);

        //remove the recipe from the favorite recipes
        let newFavRecipes = likedRecipes.filter(recipe => {
            return recipe.id != id;
        })


        //save the new array to the local storage
        localStorage.setItem("favoriteRecipes", JSON.stringify(newFavRecipes));

        icon.setAttribute("data-favorite", false);

    }

    //if the recipe is not a favorite one
    if (isFavorite == "false" && !doesIdExist) {
        //change the color of the icon
        icon.removeAttribute("fill");;
        icon.setAttribute("fill", color);

        //add the id of the recipe to the liked recipes array
        likedRecipes.push(recipeInfo);


        //save the array to the local storage
        localStorage.setItem("favoriteRecipes", JSON.stringify(likedRecipes));
        icon.setAttribute("data-favorite", true);


    }


}

//checking to see if we have recipe data in the local storage
//if not, we add new data ---an empty array
export let checkLocalStorageData = () => {
    //get all the ids from local storage

    let storageRecipeData = JSON.parse(localStorage.getItem("favoriteRecipes"));

    //if we don't have any recipe data
    if (!storageRecipeData) {
        storageRecipeData = [];
        //save the array to the local storage
        localStorage.setItem("favoriteRecipes", JSON.stringify(storageRecipeData));
    }
}



//build a list of favorite recipes
export let buildFavRecipesList = () => {
    let favListContainer = document.getElementById('fav-list');
    let storageRecipeData = JSON.parse(localStorage.getItem("favoriteRecipes"));

    favListContainer.innerHTML = "";

    storageRecipeData.forEach(recipe => {
        // let item = document.createElement('li');
        // let detailsLink = document.createElement('a');
        let recipeName = recipe.name.trim();
        let item = `<li><span class='recipe-icon'>&#x1F37D;</span><a href='view/recipe-details.html?id=${recipe.id}'>${recipeName}</a></li>`

        favListContainer.innerHTML += item;


    });

}



/*------------------------------------*\
  # THE RECIPE DETAILS PAGE
\*------------------------------------*/


export let buildRecipeDetailsView = (name, time, servings, img, id, author) => {
    //checking whether the recipe is a favorite one or not before we build the card
    let isFavorite = isFavoriteRecipe(id);
    //fill color of the icon
    let fillColor = ""

    if (isFavorite) {
        fillColor = "#2622a8";
    }

    let cardJSON = JSON.stringify({ name, time, servings, img, id });


    let recipeName = document.getElementById("recipe-name");
    let cardImg = document.getElementById("card-img");
    let heartIcon = document.getElementById("heart-icon");
    let timeRecipe = document.getElementById("time-recipe");
    let servingsRecipe = document.getElementById("servings-recipe");
    let authorRecipe = document.getElementById("author-recipe");


    //add img
    cardImg.style.backgroundImage = `url(${img})`;
    //add name
    recipeName.innerHTML = name;
    //add favorite icon
    heartIcon.id = id;
    heartIcon.setAttribute("data-info", cardJSON);
    heartIcon.setAttribute("data-favorite", isFavorite);
    heartIcon.setAttribute("fill", fillColor);
    //add time
    timeRecipe.innerHTML = time;
    //add servings
    servingsRecipe.innerHTML = servings;
    //add author
    authorRecipe.innerHTML = `${author}`;

}


export let buildRecipeIngredients = ingredients => {
    let ingredientsContainer = document.getElementById("ingredients-container");
    ingredientsContainer.innerHTML = "";

    let listItems = "";

    ingredients.forEach(ingredient => {
        let item = `<li class='check-item'><input type="checkbox" id="ing-${ingredient.id}"/><label class='ing-text' for="ing-${ingredient.id}">${ingredient.original}</label></li>`;
        listItems += item;
    });

    ingredientsContainer.innerHTML = listItems;

}


export let buildRecipeInstructions = instructions => {
    let instructionsContainer = document.getElementById("instructions-container");
    instructionsContainer.innerHTML = "";

    let listItems = "";

    instructions.forEach(instruction => {
        let step = instruction['step'].trim();
        let item = `<li>${step}</li>`;
        listItems += item;
    });

    instructionsContainer.innerHTML = listItems;

}




//get query params
export let getParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});