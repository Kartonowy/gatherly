import {Elysia, t} from "elysia"
import { node } from "@elysiajs/node"
import {APIrouter} from "./routes/router.js";



const app = new Elysia({ adapter: node() })
    .get('/', () => 'Hellow world')
    .use(APIrouter)
    .listen(3000, ({ hostname, port }: { hostname: string, port: number}) => {
        console.log(`Elysia listening on ${hostname}:${port}`)
})
