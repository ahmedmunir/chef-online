// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderSpinner, clearSpinner} from './views/base';
import Recipe from './models/Recipe';
import * as recipeView from './views/recipeView';
import {createShoppingList} from './models/ShoppingList';
import * as shoppingListView from './views/shoppingListView';
import Likes from './models/Likes';
import * as likesView from './views/likesView';

const state = {};

/*
**** SEARCH CONTROLLER ****
*/ 

// Getting search result from Search model
elements.inputSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    controllerSearch();
})

//surfing between results pages
elements.results__pages.addEventListener('click', e => {
    let btn, forwardPage;
    btn = e.target.closest('.btn-inline');
    forwardPage = (btn.childNodes[1].innerText.charAt(5))
    
    //clear old results pages buttons
    searchView.clearResultsPages(btn.parentElement);
    
    //add new buttons
    searchView.resultsPages(forwardPage, state.Search.result);
})


// Get Search Result Function
const controllerSearch = async () => {
    let query;

    //get query from user
    query = searchView.getInput();

    if(query) {

        //clear input field
        searchView.clearInput();

        //clear previous results
        searchView.clearPreviousResults();
        
        //add waiting UI till the result comes
        renderSpinner(elements.results);

        //clear pages buttons (pagination)
        searchView.clearResultsPages(elements.results__pages);
        
        //pass query to Search model and w8 for result
        state.Search = new Search(query);
        await state.Search.getResult();

        //clear spinner loader
        clearSpinner();

        //load results & pages buttons
        searchView.resultsPages("1", state.Search.result);
    }

}

/*
**** RECIPE CONTROLLER ****
*/ 

//getting recipe information onClick
elements.results.addEventListener("click", (e) => {

    //check that the list of items is not empty
    if (e.target.closest(".results__link")) {
        controllerRecipe(e.target.closest(".results__link"));
    } 

})



//add event listeners when using + or - for servings or click heart symbol to add to favourite list
elements.recipe.addEventListener('click', e => {

    //if heart symbol clicked to add recipe to my favourite list
    if(e.target.classList[0] == "header__likes" || 
       e.target.classList[0] == "recipe__love") {
           LikesListController();
    } else {

        let symbolClass;
        
        //use if & elif for both svg & use tags
        if(e.target.tagName == "svg"){

            //get the symbol
            symbolClass = e.target.firstElementChild.href.baseVal;

            //updating current state of recipe
            state.Recipe.updateRecipe(symbolClass);
            recipeView.updateIngredients(state.Recipe.result);
        
        } else if(e.target.tagName == "use") {

            //get the symbol
            symbolClass = e.target.href.baseVal;

            //updating current state of recipe
            state.Recipe.updateRecipe(symbolClass);
            recipeView.updateIngredients(state.Recipe.result);

        // in case when clicking on Add to shopping List
        } else if (e.target.innerText.toUpperCase() == "ADD TO SHOPPING LIST") {
            controllerShoppingList();
        }
    }
    
})

const controllerRecipe = (target) => {
    let recipe_link; 

    try{
         //case of link already with the user
        if(window.location.hash && target.currentTarget == window) {

            recipe_link = window.location.hash;

            recipeDetails(recipe_link);
        } else if(target.getAttribute("href")) {

            //in case is the user just surfing the website
            //get unique id of each recipe
            recipe_link = target.getAttribute("href");

            //remove grey background color from old list and add it to new
            if (document.querySelector('.results__link--active')) {
                document.querySelector('.results__link--active').classList.remove('results__link--active');
            }
            target.classList.add('results__link--active');

            recipeDetails(recipe_link);
        }
    } catch(error) {
        console.log(error);
    }
            

}

// display recipe details
const recipeDetails = async (recipe_link) => {
    
    //clear old recipe 
    recipeView.clearRecipeDetails();
        
    //load spinner
    renderSpinner(elements.recipe);

    //create new state for recipe
    state.Recipe = new Recipe(recipe_link);

    //waiting for recipe ingredients from API
    state.Recipe.result = await state.Recipe.getIngredients();
        
    //clear spinner
    clearSpinner();

    // add new recipe with ingredients
    recipeView.recipeDetailsView(state.Recipe.result);
}

/*
**** SHOPPING LIST CONTROLLER ****
*/ 

//add event listener when clicking to remove a list from shopping list
elements.shopping__List.addEventListener("click", e => {
    shoppingListView.deleteElement(e);
})

const controllerShoppingList = () => {
    let recipe_list ;

    recipe_list = document.querySelector('.recipe__ingredient-list');
    
    //passing contents of recipe to shopping list
    const ShoppingList = createShoppingList(state.Recipe.result);

    //update shopping list
    shoppingListView.updateShoppingList(ShoppingList);
}

/************ Likes CONTROLLER ************/
const LikesListController = () => {
    // create new favourite recipe
    let newLike, liked;
    newLike = new Likes();
    liked = newLike.addLike(state.Recipe.result.api, state.Recipe.result.label, state.Recipe.result.source, state.Recipe.result.image);

    //check whether item added to favourite list or not
    if (!likesView.favouriteListChecker(elements.heart)) {
        
        //add liked recipe to favourite recipes using Heart symbol
        likesView.displayLikes(liked);
    }

    //change outline white heart with heart full of white.
    likesView.whiteHeart(elements.heart);
}

/*
*** CASES that can be override
*/ 
//search for recipe if the user already has the link
window.addEventListener('load', controllerRecipe); 