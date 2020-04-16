
export const createShoppingList = (ingredients) => {

    const shoppingList = [];

    ingredients.array.forEach( ingredient => {
        shoppingList.push(ingredient.slice());
    })
    return shoppingList;
}