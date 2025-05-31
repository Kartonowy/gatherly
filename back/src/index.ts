import {Elysia} from "elysia"
import { node } from "@elysiajs/node"
import { jwt } from "@elysiajs/jwt"
import {APIrouter} from "./routes/router.js";
import { cors } from "@elysiajs/cors"
import { swagger } from "@elysiajs/swagger"



const app = new Elysia({ adapter: node() })
    .use(swagger())
    .use(
        jwt({
            name: "jwt",
            secret: "placeholder_secret"
        })
    )
    .use(cors(
        {
            origin: "*",
            credentials: true,
            methods: ['GET', 'POST', 'OPTIONS'],
            allowedHeaders: ["Content-Type", "Access-Control-Allow-Origin", "Authorization"]
        }
    ))
    // .onBeforeHandle(({ request }: any) => {
    //     console.log(request)
    // })
.onError(({ code, error }: any) => {
    console.error('[🔥 Error]', code, error);
    return new Response(`Error: ${error.message}`, { status: 500 });
})

    .use(APIrouter)
    .listen(3000, ({ hostname, port }: { hostname: string, port: number}) => {
        console.log(`Elysia listening on ${hostname}:${port}`)
})
