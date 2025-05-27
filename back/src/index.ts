import {Elysia, t} from "elysia"
import { node } from "@elysiajs/node"
import { jwt } from "@elysiajs/jwt"
import {APIrouter} from "./routes/router.js";



const app = new Elysia({ adapter: node() })
    .use(
        jwt({
            name: "jwt",
            secret: "placeholder_secret"
        })
    )
    .use(APIrouter)
    .listen(3000, ({ hostname, port }: { hostname: string, port: number}) => {
        console.log(`Elysia listening on ${hostname}:${port}`)
})
