import {useGlobalState} from "../scripts/state.ts";
import {DialogKind, SleeveT} from "./types.ts";
import {useEventListener} from "@vueuse/core";

const { showDialog, setDialog } = useGlobalState()
export const cpy = () => {
    useEventListener(document, "paste", (_e) => {
            navigator.clipboard.readText().then(text => {
                setDialog(DialogKind.SleeveAdd, new SleeveT("", text));
                showDialog(true)
            })
    })
}