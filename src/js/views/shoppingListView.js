import {elements} from './base';

export const updateShoppingList = (shoppingList) => {

    //iterate over shoppingList to add them
    shoppingList.forEach(element => {
        elements.shopping__List.insertAdjacentHTML('beforeend',
        `
        <li class="shopping__item">
            <div class="shopping__count">
                <input type="text" value="${element[0]}" step="100">
                <p>${element[1]}</p>
            </div>
            <p class="shopping__description">${element[2]}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
        `)
    });

}

export const deleteElement = (event) => {

    //check if x clicked or not
    if(event.target.tagName == "use" || event.target.tagName == "svg") {
        
        //delete selected list
        event.target.closest(".shopping__item").remove();
    }
}