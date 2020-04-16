import {elements} from './base';

//display ingredients of each recipe
export const recipeDetailsView = (ingredients) => {
    let lists_string = '';

    //create HTML lists as a string 
    ingredients.array.forEach(ingredient => {
        lists_string += `
        <li class="recipe__item">
            <svg class="recipe__icon">
                <use href="img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__count">${ingredient[0]}</div>
            <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient[1]}</span>
                ${ingredient[2]}
            </div>
            </li>
        `
    })

    elements.recipe.insertAdjacentHTML('afterbegin', 
    `
                <figure class="recipe__fig">
                    <img src="${ingredients.image}" alt="$recipe.label" class="recipe__img">
                    <h1 class="recipe__title">
                        <span>${ingredients.label}</span>
                    </h1>
                </figure>
                <div class="recipe__details">
                    <div class="recipe__info">
                        <svg class="recipe__info-icon">
                            <use href="img/icons.svg#icon-stopwatch"></use>
                        </svg>
                        <span class="recipe__info-data recipe__info-data--minutes">${ingredients.time}</span>
                        <span class="recipe__info-text"> minutes</span>
                    </div>
                    <div class="recipe__info">
                        <svg class="recipe__info-icon">
                            <use href="img/icons.svg#icon-man"></use>
                        </svg>
                        <span class="recipe__info-data recipe__info-data--people">${ingredients.yield}</span>
                        <span class="recipe__info-text"> servings</span>
    
                        <div class="recipe__info-buttons">
                            <button class="btn-tiny">
                                <svg>
                                    <use href="img/icons.svg#icon-circle-with-minus"></use>
                                </svg>
                            </button>
                            <button class="btn-tiny">
                                <svg>
                                    <use href="img/icons.svg#icon-circle-with-plus"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <button class="recipe__love">
                        <svg class="header__likes">
                            <use href="img/icons.svg#icon-heart-outlined"></use>
                        </svg>
                    </button>
                </div>
                <div class="recipe__ingredients">
                    <ul class="recipe__ingredient-list">
                        ${lists_string}
                    </ul>
                    <button class="btn-small recipe__btn">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                    </button>
                </div>
    
                <div class="recipe__directions">
                    <h2 class="heading-2">How to cook it</h2>
                    <p class="recipe__directions-text">
                        This recipe was carefully designed and tested by
                        <span class="recipe__by">${ingredients.source}</span>. Please check out directions at their website.
                    </p>
                    <a class="btn-small recipe__btn" href=${ingredients.url} target="_blank">
                        <span>Directions</span>
                        <svg class="search__icon">
                            <use href="img/icons.svg#icon-triangle-right"></use>
                        </svg>
    
                    </a>
                </div>
                
    `);
}

//clear ingredients at each time
export const clearRecipeDetails = () => {
    elements.recipe.innerHTML = '';
}

//update ingredients 
export const updateIngredients = (updateIngredients) => {
    document.querySelector('.recipe__info-data--people').innerHTML = updateIngredients.yield;

    //update lists
    document.querySelectorAll('.recipe__count').forEach((arr, index) => {
        arr.textContent = updateIngredients.array[index][0];
    });
}

const newRecipeEquation = (peopleNumber, current_recipe_value, ref) => {
    return Math.ceil((peopleNumber * current_recipe_value) / ref);
    
}