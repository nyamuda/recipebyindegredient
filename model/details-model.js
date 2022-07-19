export function getRecipeById(id) {
    return fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=3c3f6b203655415e8ab692615695fab1`)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Bad Response");
            }
        })
        .then(data => data)
}