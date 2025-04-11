import type { Reactive } from "vue";
import type { SleeveT } from "../../utils/types";
import { useGlobalState } from "../state";
export default function sort() {
    let { items } = useGlobalState()
    for (let i = 0; i < items.length; ++i) {
        items[i].changePos(5, i*75)
    }
}
