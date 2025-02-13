import { Elysia } from "elysia"
import { node } from "@elysiajs/node"

const app = new Elysia({ adapter: node() })
    .get('/', () => 'Hellow world')
    .listen(3000, ({ hostname, port }: { hostname: string, port: number}) => {
        console.log(`Elysia listening on ${hostname}:${port}`)
})
