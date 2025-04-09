import type { SleeveT } from "../../utils/types";
import { useGlobalState } from "../state";
export default function sort() {
    let { items } = useGlobalState()
    items.map((e: SleeveT) => console.log(e))
}
