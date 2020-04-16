import {elements} from './base';

//get input from user
export const getInput = () => {
    let value = elements.searchfield.value;
    return value;
}

//export clear input after getting value from user
export const clearInput = () => {
    elements.searchfield.value = "";
}

// display results function
export const UIresults = (recipes, start=0, end=10) => {
    //clear previous results 
    clearPreviousResults();

    //add Ul to add results as lists inside of it
    elements.results.insertAdjacentHTML('afterbegin',
    '<ul class="results__list"></ul');

    //add results to page UI
    recipes.slice(start, end).forEach(addNewResult);
}

//clear all recipes for new search
export const clearPreviousResults = () => {
    const ul_results = document.querySelector('.results__list');
    if(ul_results) {
        ul_results.remove();
    }
}

//add new list of recipes
const addNewResult = result => {
    //add list each time
    document.querySelector('.results__list').insertAdjacentHTML('beforeend',
    `<li>
        <a class="results__link" href="${result.recipe.uri.slice(result.recipe.uri.indexOf('#recipe'))}">
            <figure class="results__fig">
                <img src="${result.recipe.image}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${reduceTitle(result.recipe.label)}</h4>
                <p class="results__author">${result.recipe.source}</p>
            </div>
        </a>
    </li>`)
}

//reduce title of recipe to 17
const reduceTitle = (title, limit = 17) => {
    if(title.length > limit){
        let arr = [];
        let iterator = 0;
        while (arr.length < limit) {
            arr.push(title[iterator]);
            iterator += 1;
        }
        return arr.join("")+"..."
    }
    return title
}

// display result pages
export const resultsPages = (pgNumb, partOfRecipes) => {
    if (pgNumb == '1') {
        UIresults(partOfRecipes, 0, 10);
        elements.results__pages.insertAdjacentHTML('beforeend', results_page_button('next', 2, 'right'));
    } else if(pgNumb == '2') {
        UIresults(partOfRecipes, 10, 20);
        elements.results__pages.insertAdjacentHTML('afterbegin', results_page_button('prev', 1, 'left'));
        elements.results__pages.insertAdjacentHTML('beforeend', results_page_button('next', 3, 'right'));
    } else if(pgNumb == '3') {
        UIresults(partOfRecipes, 20, -1);
        elements.results__pages.insertAdjacentHTML('afterbegin', results_page_button('prev', 2, 'left'));
    }
}

// clear result pages button
export const clearResultsPages = (parent) => {
    parent.innerHTML = '';
}

//results page button to be added
export const results_page_button = (direction, pgNumb, triangle) => {
    return `<button class="btn-inline results__btn--${direction}">
                <span>Page ${pgNumb}</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-${triangle}"></use>
                </svg>
            </button>`
}