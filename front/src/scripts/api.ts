import axios from "axios";

export async function getBoards() {
    console.log("getBoards");
    const token = localStorage.getItem("auth-token");
    console.log(token)
    const boards = await axios.post("/api/boards", {}, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    })
    console.log(boards);
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

