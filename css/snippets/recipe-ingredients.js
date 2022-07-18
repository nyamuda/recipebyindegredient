let buildRecipeIngredients = (ingredients) => {
    let view = `<ul class="ingredients-list">`;
    ingredients.forEach((ingredient, indx) => {
        let item = `<li><input type="checkbox" id="ing-${indx}" /><label for="ing-1">${ingredient}</li>`;
        view += item;
    });
    view += "</ul>";

    return view;
}