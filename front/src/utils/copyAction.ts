import {useGlobalState} from "../scripts/state.ts";
import {useEventListener} from "@vueuse/core";
import {DialogKind} from "../types/enums.ts";
import {SleeveT} from "../types/sleeve.ts";

const { showDialog, setDialog } = useGlobalState()
export const cpy = () => {
    useEventListener(document, "paste", (_e) => {
            navigator.clipboard.readText().then(text => {
                setDialog(DialogKind.SleeveAdd, new SleeveT("", text));
                showDialog(true)
            })
    })
}