//dynamically build a recipe card
function buildRecipeCard(name, time, servings, img) {
    let recipeName = cutRecipeName(name);
    console.log(img);

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
           <a href="#"><svg class="heart" xmlns="http://www.w3.org/2000/svg" height="48px" width="48px"><path d="m24 41.95-2.05-1.85q-5.3-4.85-8.75-8.375-3.45-3.525-5.5-6.3T4.825 20.4Q4 18.15 4 15.85q0-4.5 3.025-7.525Q10.05 5.3 14.5 5.3q2.85 0 5.275 1.35Q22.2 8 24 10.55q2.1-2.7 4.45-3.975T33.5 5.3q4.45 0 7.475 3.025Q44 11.35 44 15.85q0 2.3-.825 4.55T40.3 25.425q-2.05 2.775-5.5 6.3T26.05 40.1Z"/></svg></a>
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


export { buildRecipeCard };