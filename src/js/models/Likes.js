export default class Likes {
    constructor() {
        this.likes = [];
    }
    
    addLike(ID, label, source, image) {
        const Like = {ID, label, source, image};
        this.likes.push(Like);
        return Like;
    }
}