import { createGlobalState } from '@vueuse/core'

import { reactive } from 'vue'
import type { SleeveT } from '../types/sleeve'
import { DialogKind } from '../types/enums'

export const useGlobalState = createGlobalState(
    () => {
        let state: { 
            board: SleeveT[],
            dialog: {
                active: boolean,
                kind: DialogKind,
                context: SleeveT | null
            }
        } = reactive({
            board: [],
            dialog: {
                active: false,
                kind: DialogKind.None,
                context: null
            }
        })

        let setBoard = (_board: SleeveT[]) => {
            state.board = _board
        }


        let getItem = (sleevekey?: PropertyKey) => {
            return state.board.find((e) => e.sleevekey == sleevekey)
        }

        let addItem = (item: SleeveT) => {
            state.board.push(item)
        }

        let removeItem = (_sleevekey: PropertyKey) => {
            state.board = state.board.filter((e) => {
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


        return { state, getItem, addItem, removeItem, showDialog, setDialog, getDialogContext, setBoard }
    }
)

