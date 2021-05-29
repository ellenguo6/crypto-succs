

import {PLANT_IMAGES, POT_IMAGES} from "./image_dict.js"

export class Plant {
    constructor(name, dna, potId, happiness, growth) {
        this.name = name;
        this.dna = dna;
        this.potId = potId;
        this.happiness = happiness;
        this.growth = growth;
    }
    //DNA should be two digit number, first digit decides plant
    getPlantImg() {
        let plantImgId = this.dna % 3;
        return PLANT_IMAGES[plantImgId];
    }
}

