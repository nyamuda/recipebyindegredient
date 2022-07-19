export let buildRecipeDetailsView = (name, time, servings, img, id, author, fn) => {
    //checking whether the recipe is a favorite one or not before we build the card
    let isFavorite = fn(id);
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
    cardImg.style.background = `url(${img}) no-repeat center;`;
    //add name
    recipeName.innerHTML = name;
    //add favorite icon
    heartIcon.id = id;
    heartIcon.setAttribute("data-info", cardJSON);
    heartIcon.setAttribute("data-favorite", isFavorite);
    //add time
    timeRecipe.innerHTML = time;
    //add servings
    servingsRecipe.innerHTML = servings;
    //add author
    authorRecipe.innerHTML = `By ${author}`;

}


export let buildRecipeIngredients = ingredients => {
    let ingredientsContainer = document.getElementById("ingredients-container");
    ingredientsContainer.innerHTML = "";

    let listItems = "";

    ingredients.forEach(ingredient => {
        let item = `<li><input type="checkbox" id="ing-${ingredient.id}"/><label for="ing-${ingredient.id}">${ingredient.original}</label></li>`;
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