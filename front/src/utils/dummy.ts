import { reactive } from "vue";
import type { SleeveT } from "./types";

export const sleeves: {
    sleeves: Array<SleeveT>,
    addSleeve: (arg: SleeveT) => void
} = reactive({
    sleeves: [
        {
            label: "Twoja znajoma",
            url: "https://roksa.pl/",
            position: {
                x: 0,
                y: 0
            },
            changePos(_newx, _newy) {

            },
            sleevekey: null

        },
        {
            label: "Muzyka do nauki",
            url: "https://youtube.com",
            position: {
                x: 0,
                y: 0
            },
            changePos(_newx, _newy) {

            },
            sleevekey: null
        },
        {
            label: "Poradnik",
            url: "https://youtu.be/oShyXoyE5SM",
            position: {
                x: 0,
                y: 0
            },
            changePos(_newx, _newy) {

            },
            sleevekey: null
        }
    ],
        addSleeve(element: SleeveT) {
            this.sleeves.push(
            {
                label: element.label,
                url: element.url,
                position: element.position,
                changePos: (_newx, _newy) => {},
                sleevekey: null
            }
        )
            return
        }
    })
