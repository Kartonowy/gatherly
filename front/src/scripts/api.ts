import axios  from "axios";
import {useGlobalState} from "./state.ts";
import {SleeveT} from "../types/sleeve.ts";

export async function getBoards() {
    const { setBoard } = useGlobalState();

    const token = localStorage.getItem("auth-token");
    const boards = await axios.post("/api/boards", {}, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    })

    const sleeves = await axios.post("/api/sleeve", {
            board_id: boards.data[0].id
        },
        {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        })

    console.log(sleeves.data)



    setBoard(sleeves.data.map((e: any) => {
                const s  = new SleeveT( e.name, e.url)
                s.addHook(() => {
                    s.changePos!(e.position_x, e.position_y)
                })
                return s
            }
        )
    )
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

    const { token } = res.data;
    console.log(token)
    localStorage.setItem("auth-token", token);
    console.log("Logged In")
}

export const registerHandler = async (x: registerForm) => {
    console.log(x)
    const placeholder = await axios.post("http://127.0.0.1:3000/api/sign-up", x, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true
    })
    console.log(placeholder.data);
}

