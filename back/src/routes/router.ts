import {Elysia, t} from "elysia";

import {createInsertSchema} from "drizzle-typebox";
import {boardsTable, sleeveTable, usersTable} from "../db/schema.js";
import {db} from "../db/index.js";
import {eq} from "drizzle-orm";



const _createUser = createInsertSchema(usersTable, {
    name: t.String(),
    email: t.String({ format: "email" }),
    password: t.String(),
})


const _createBoard = createInsertSchema(boardsTable, {
    owner: t.Number(),
    name: t.String()
})


const _createSleeve = createInsertSchema(sleeveTable, {
    name: t.String(),
    url: t.String(),
    summary: t.Optional(t.String()),
    tags: t.Array(t.Never(), { default: [] }),
    board: t.Numeric()
})


export const APIrouter = new Elysia({ prefix: "/api" })
    .get('/', (req: any, res: any) => { console.log(req, res) })
    .post("/sign-up", ({ body }: { body: object}) => {
        // second VALIDATION OF CREDENTIALS
        // ADDING TO DATABASE
        // LOGGING IN OD RAZU (JWT)
        console.log(body)
    }, {
        body: t.Omit(
            _createUser,
            ["id"]
        )
    })
    .post("/log-in", ({ body }: { body: object}) => {
        // CHECK CREDENTIALS
        // ADD JWT
        console.log(body)
    })
    .post("/add-board", async ({ body }: any) => {
        // CHECK IF SUCCEED?
        console.log(await db.insert(boardsTable).values([{...body}]))
    }, {
        body: t.Omit(
            _createBoard,
            ["id"]
        )
    })
    .post("/board/", async ({body, error}: any) => {
            // Not adding dual eq check for sakes of future, might add collaborations meaning we have to check
            // both owner and collaborants
            const q = await db.select().from(boardsTable).where(eq(boardsTable.id, Number(body.id)));
            if (q[0].owner == Number(body.owner)) {
                return q
            }
            return error(403, "Forbidden")
        },
        {
            body: t.Object({
                owner: t.String(),
                id: t.String()
            })
        })
    .post("/sleeve", async ({body} : any) => {
        return db.select().from(sleeveTable).where(eq(sleeveTable.board, Number(body.board_id)));
    }, {
        body: t.Object({
            board_id: t.String()
        })
    })
    .post("/add-sleeve", async ({body}: any) => {
        console.log(await db.insert(sleeveTable).values([{...body}]))
    },
        {
            body: t.Omit(
                _createSleeve,
                ["id"]
            )
        })
