export default class CollisionDetector{
    constructor(game){
        this.game = game;
    }

    rectCollisionDetector(rect_1, rect_2){
        return rect_1.position.x + rect_1.width > rect_2.position.x &&
                rect_1.position.x < rect_2.position.x + rect_2.width &&
                rect_1.position.y < rect_2.position.y + rect_2.height &&
                rect_1.position.y + rect_1.height > rect_2.position.y
    } 
}