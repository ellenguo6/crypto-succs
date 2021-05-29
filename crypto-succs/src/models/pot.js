
import {PLANT_IMAGES, POT_IMAGES} from "./image_dict.js"

export class Pot {
    constructor(id) {
        this.id = id
    }

    getPotImg() {
        return POT_IMAGES[this.id];
    }
}