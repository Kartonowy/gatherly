import axios from "axios";

export async function getBoards() {
    console.log("getBoards");
    const boards = await axios.post("/api/boards", {}, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true
    })
    console.log(boards);
}