import { reactive } from "vue";
import { SleeveT } from "./types";

export const sleeves: {
    sleeves: Array<SleeveT>,
    addSleeve: (arg: SleeveT) => void
} = reactive({
    sleeves: [
        new SleeveT("Twoja znajoma", "https://roksa.pl/"),
        new SleeveT("Muzyka do nauki", "https://youtube.com"),
        new SleeveT("Poradnik", "https://youtu.be/oShyXoyE5SM"),
    ],
        addSleeve(element: SleeveT) { 
        this.sleeves.push(new SleeveT(element.label, element.url))
            return
        }
    })
