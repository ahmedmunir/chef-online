import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    //method to get the result from API
    async getResult() {
        const app_id = "376c7f3f";
        const app_key = "7868a396dcc150a5f9186c4005af8496";
        const proxy = "https://cors-anywhere.herokuapp.com/";
        try{
            const resp = 
            await axios(`${proxy}https://api.edamam.com/search?q=${this.query}&app_id=${app_id}&app_key=${app_key}&to=30`);
        // const ans = await resp.text();
            this.result = resp.data.hits;
            console.log(this.result);
        } catch(err) {
            console.log(error);
        }
    }
};