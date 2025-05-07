import { createGlobalState } from '@vueuse/core'

import { reactive } from 'vue'
import {DialogKind, type SleeveT} from '../utils/types'

export const useGlobalState = createGlobalState(
    () => {
        let state: { 
            items: SleeveT[],
            dialog: {
                active: boolean,
                kind: DialogKind,
                context: SleeveT | null
            }
        } = reactive({
            items: [],
            dialog: {
                active: false,
                kind: DialogKind.None,
                context: null
            }
        })


        let getItem = (sleevekey?: PropertyKey) => {
            return state.items.find((e) => e.sleevekey == sleevekey)
        }

        let addItem = (item: SleeveT) => {
            state.items.push(item)
        }

        let removeItem = (_sleevekey: PropertyKey) => {
            state.items = state.items.filter((e) => {
                return e.sleevekey != _sleevekey
            })
        }

        let showDialog = (_show: boolean) => {
            state.dialog.active = _show;
        }

        let setDialog = (_dialog: DialogKind, _context: SleeveT | null) => {
            state.dialog.kind = _dialog;
            state.dialog.context = _context;
        }

        let getDialogContext = () => {
            return state.dialog.context
        }


        return { state, getItem, addItem, removeItem, showDialog, setDialog, getDialogContext }
    }
)

