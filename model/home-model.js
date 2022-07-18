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

//fetch random recipes from an API
function getRandomRecipes() {
    return fetch("https://api.spoonacular.com/recipes/random?apiKey=72f9b142aa074a93b5f039fbeb9b9ec4&number=1")
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Bad Response");
            }
        })
        .then(data => data)
}


export { getSearchedRecipes, getRecipesByIdInBulk, getRandomRecipes }