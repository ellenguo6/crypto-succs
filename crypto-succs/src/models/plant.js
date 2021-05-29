

import {PLANT_IMAGES, POT_IMAGES} from "./image_dict.js"

export class Plant {
    constructor(name, dna, happiness, growth) {
        this.name = name;
        this.dna = dna;
        this.happiness = happiness;
        this.growth = growth;
    }
    //DNA should be two digit number, first digit decides plant
    getPlantImg() {
        let plantImgId = (this.dna - this.dna % 10) % 3;
        return PLANT_IMAGES[plantImgId];
    }

    //second DNA digit decides pot
    getPotImg() {
        let potImgId = (this.dna % 10) % 3;
        return POT_IMAGES[potImgId];
    }
}

