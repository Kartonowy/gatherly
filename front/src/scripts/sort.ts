import { useGlobalState } from "./state";
export default function sort() {
    let { state } = useGlobalState()
    for (let i = 0; i < state.board.length; ++i) {
        state.board[i].changePos!(5, i*75)
    }
}
