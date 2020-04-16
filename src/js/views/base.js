// export all elements selected

export const elements = {
    inputSearchForm: document.querySelector('.search'),
    searchfield: document.querySelector('.search__field'),
    results: document.querySelector('.results'),
    results__pages : document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping__List: document.querySelector('.shopping__list')
}

// load spinner 
export const renderSpinner = parent => {
    const loader = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

//clear loader
export const clearSpinner = () => {
    const loader = document.querySelector('.loader');
    if(loader) loader.remove()
}