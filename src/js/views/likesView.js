import {elements} from './base';

//add favourite recipe each time the heart symbol clicked
export const displayLikes = (likedRecipe) => {
    elements.likes__List.insertAdjacentHTML("beforeend", 
        `
        <li>
            <a class="likes__link" href= ${likedRecipe.ID}>
                <figure class="likes__fig">
                    <img src=${likedRecipe.image} alt="image">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${likedRecipe.label}</h4>
                    <p class="likes__author">${likedRecipe.source}</p>
                </div>
            </a>
        </li>
        `)      
}

//color the heart with white color
export const whiteHeart = (heartButton) => {
    heartButton[0].childNodes[1].setAttribute("href", "img/icons.svg#icon-heart");
}

//check if item is already at favourite list or not
export const favouriteListChecker = (heartButton) => {
    if(heartButton[0].childNodes[1].getAttribute("href") == "img/icons.svg#icon-heart") {
        return true;
    } else {
        return false;
    }
}