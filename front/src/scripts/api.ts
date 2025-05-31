import axios from "axios";
import {useGlobalState} from "./state.ts";
import type {SleeveT} from "../types/sleeve.ts";

export async function getBoards() {
    const token = localStorage.getItem("auth-token");

    return await axios.post("/api/boards", {}, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    })
}

export async function getBoard(boardId: number) {
    const token = localStorage.getItem("auth-token");

    return await axios.post("/api/sleeve", {
            board_id: boardId,
        },
        {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        })
}

type loginForm = {
    name: string,
    password: string,
    remember: boolean,
}

type registerForm = {
    username: string,
    email: string
    password: string,
}
export const loginHandler = async (x: loginForm) => {
    const res = await axios.post("http://127.0.0.1:3000/api/log-in", x, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        withCredentials: true
    })

    if (res.status != 200) {
        console.log("Something went wrong")
        console.log(res)
        return
    }

    const {token} = res.data;
    const {state} = useGlobalState()
    state.isLoggedIn = true;
    localStorage.setItem("auth-token", token);
}

export const registerHandler = async (x: registerForm) => {
    const res = await axios.post("http://127.0.0.1:3000/api/sign-up", x, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true
    })

    if (res.status != 200) {
        console.log("Something went wrong")
        console.log(res)
        return
    }

    const {token} = res.data;
    const {state} = useGlobalState()
    state.isLoggedIn = true;
    localStorage.setItem("auth-token", token);
}

export const logout = () => {
    const {state} = useGlobalState()
    state.isLoggedIn = false;
    localStorage.removeItem("auth-token");
}

export async function insertSleeve(s: SleeveT) {
    const {getBoardId} = useGlobalState()
    try {
        const {key} = (await axios.post("http://127.0.0.1:3000/api/add-sleeve", {
            sleeve: {
                name: s.label,
                url: s.url,
                summary: "",
                tags: s.tags,
                position_x: s.position.x,
                position_y: s.position.y,
                board: getBoardId()
            }
        }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        })
        ).data
        s.sleevekey = key
    }
    catch (e) {
        console.log(e)
    }
}

export async function updateSleeve(s: SleeveT) {
    await axios.post("http://127.0.0.1:3000/api/edit-sleeve/", {
            id: Number(s.sleevekey),
            sleeve: {
                name: s.label,
                url: s.url,
                summary: "",
                tags: s.tags,
            }
        }
        , {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        })
}

export async function deleteSleeve(s: SleeveT) {
    await axios.post("http://127.0.0.1:3000/api/delete-sleeve/", {
            id: Number(s.sleevekey),
        }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        }
    )
}