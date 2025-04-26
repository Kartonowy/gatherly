import { useGlobalState } from "./state";
export default function sort() {
    let { state } = useGlobalState()
    for (let i = 0; i < state.items.length; ++i) {
        state.items[i].changePos!(5, i*75)
    }
}
