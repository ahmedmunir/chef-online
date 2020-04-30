import axios from 'axios';

let ingredients = {};
let ingredients_list = new Array(3);
let ingredients_list_array = [];


export default class Recipe {
    constructor(ID) {
        this.ID = ID;
    }

    async getIngredients() {
        const app_id = "376c7f3f";
        const app_key = "7868a396dcc150a5f9186c4005af8496";
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const units = ["lb", "tsp", "cup","cups", "x", "oz", "pinch", 
                        "teaspoons", "ounces", "teaspoon", "tbsp", 
                        "tbsp.", "tsp.", "tablespoon", "ounce",
                        "Cup", "Cups", "cup", "cups", "Tablespoons",
                        "Teaspoon"];
        try {

            // getting information about specific recipe from API
            const apiData = `${proxy}https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23${this.ID.slice(1)}&app_key=${app_key}&app_id=${app_id}`;
            const recipe = await axios(apiData);

            //clear reference of recipe-lists to renew it each time because it is call by reference
            ingredients_list_array.length = 0;
            
            //create array of ingredients
            recipe.data[0].ingredientLines.forEach(ingredient => {

                //split string into array of words to get the amount of ingredient
                let text_array = ingredient.split(' ');

                //in case that first 2 strings are numbers like: 2 1/2 tsp ....
                if(Number(text_array[0]) && parseInt(text_array[1])){
                    ingredients_list[0] = eval(text_array[0]) + eval(text_array[1]);
                    ingredients_list[1] = text_array[2];
                    ingredients_list[2] = text_array.slice(3).join(" ");
                
                //check if there is just amount of product without unit
                }else if (Math.ceil(Number(text_array[0])) || text_array[0].charAt(1) == "/") {
                    ingredients_list[0] = eval(text_array[0]);
                    ingredients_list[1] = units.includes(text_array[1]) ? text_array[1] : "";
                    ingredients_list[2] = units.includes(text_array[1]) ? text_array.slice(2).join(" ") : text_array.slice(1).join(" ");

                // in case we have value written as number followed by grams like: 500g
                } else if(parseInt(text_array[0])) {
                    ingredients_list[0] = text_array[0].slice(0, text_array[0].length -1);
                    ingredients_list[1] = text_array[0].slice( text_array[0].length-1);
                    ingredients_list[2] = text_array.slice(1).join(" ");

                //in case we don't have any mount or unit provided by API
                } else {
                    ingredients_list[0] = ("");
                    ingredients_list[1] = ("");
                    ingredients_list[2] = (text_array.join(" "));

                }
                ingredients_list_array.push(ingredients_list.slice());
            });

            ingredients.api = this.ID;
            ingredients.image = recipe.data[0].image;
            ingredients.label = recipe.data[0].label;
            ingredients.yield = recipe.data[0].yield;
            ingredients.source = recipe.data[0].source;
            ingredients.url = recipe.data[0].url
            ingredients.array = ingredients_list_array
            ingredients.time = calculateTime(recipe.data[0].ingredients.length);
            
            return ingredients;
        } catch (error) {
            console.log(error);
        }

    }

    //update Recipe Values
    updateRecipe (symbol) {
        let update_factor;

        //in case of clicking on Plus
        if (symbol.includes("plus")) {

            //create factor
            update_factor = (this.result.yield + 1) / this.result.yield;

            //update all variables inside
            this.result.array.forEach(arr => {
                
                //check if there is amount for that ingredient
                if(Number(arr[0])){
                //    arr[0] = Math.ceil(eval(arr[0]) * update_factor);
                    arr[0] = (eval(arr[0]) * update_factor).toFixed(2);
                }  
            });

            this.result.yield += 1;

            
        //in case of clicking on minus
        } else if(symbol.includes("minus")) {
            
            //create factor
            update_factor = (this.result.yield - 1) / this.result.yield;

            //prevent update for servings < 1
            if(this.result.yield > 1){

                this.result.yield -= 1;

                //update all variables inside
                this.result.array.forEach(arr => {
                    
                    //check if there is amount for that ingredient 
                    if(Number(arr[0])){
                        // arr[0] = Math.round(eval(arr[0]) * update_factor);
                        arr[0] = (eval(arr[0]) * update_factor).toFixed(2);
                    }  
                })
            }
        }
        
    }
    
}


//Calculating time by assuming that 3 ingredients take 15mins
const calculateTime = (ingredientsLength,) => {
    const periods = Math.ceil(ingredientsLength / 3);
    return periods * 15;
}


