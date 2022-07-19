//img background
let recipeBackImg = `background:`;
let view = `<div class="card">
    <section class="card-head">
        <div class="card-img-container">

            <div class="card-img" style="${recipeBackImg}">
                <a class="heart-container heart-link" href="#"><svg id="${id}" data-info='${cardJSON}' data-favorite=${isFavorite} fill="${fillColor}" class="heart" fill="" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 21.275-1.6-1.425q-2.55-2.3-4.212-3.963Q4.525 14.225 3.55 12.9q-.975-1.325-1.362-2.45Q1.8 9.325 1.8 8.15q0-2.45 1.625-4.075T7.5 2.45q1.3 0 2.463.525 1.162.525 2.037 1.5.85-.975 2.025-1.5Q15.2 2.45 16.5 2.45q2.425 0 4.062 1.625Q22.2 5.7 22.2 8.15q0 1.175-.388 2.288-.387 1.112-1.362 2.437-.975 1.325-2.65 3-1.675 1.675-4.225 3.975Z"/></svg></a>
            </div>
        </div>
        <div class="text">
            <h1 class="food-name">
            ${name}
            </h1>
            <div class="card-bottom">
                <div class="block-row-col">
                    <div class="time"><img class="card-icon" src="/images/schedule_FILL1_wght400_GRAD0_opsz48.png" alt="time" width="30px">
                        <p><span class="accent-text">${time}</span>Mins</p>

                    </div>
                    <div class="serves"><img class="card-icon" src="/images/people.png" alt="people" width="30px">
                        <p><span class="accent-text">${servings}</span>Serving</p>
                    </div>
                </div>

                <div class="recipe-author">
                    <p>Made by Pierce</p>
                </div>

            </div>

        </div>
    </section>

    <section class="ingredients-instructions">
        <div class="ingredients-detail">
            <h2>Ingredients</h2>
               ${ingredients}
        </div>
        <div class="instructions-detail">
            <h2>Instructions</h2>
        </div>
    </section>

</div>`