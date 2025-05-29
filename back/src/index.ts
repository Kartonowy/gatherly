import {Elysia, t} from "elysia"
import { node } from "@elysiajs/node"
import { jwt } from "@elysiajs/jwt"
import {APIrouter} from "./routes/router.js";
import { cors } from "@elysiajs/cors"



const app = new Elysia({ adapter: node() })
    .use(
        jwt({
            name: "jwt",
            secret: "placeholder_secret"
        })
    )
    .use(cors(
        {
            origin: "http://localhost:5173",
            credentials: true
        }
    ))
    .use(APIrouter)
    .listen(3000, ({ hostname, port }: { hostname: string, port: number}) => {
        console.log(`Elysia listening on ${hostname}:${port}`)
})
