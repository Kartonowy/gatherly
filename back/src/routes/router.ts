import {Elysia, error, t} from "elysia";

import {createInsertSchema} from "drizzle-typebox";
import {boardsTable, sleeveTable, usersTable} from "../db/schema.js";
import {db} from "../db/index.js";
import {eq, or} from "drizzle-orm";
import * as argon2 from "argon2";



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
    .post("/sign-up", async ({ body, jwt, cookie: { auth }, set }: any) => {

        console.log(body)
        // Check i user exists
        const data = await db.select().from(usersTable).where(
            or(
                eq(usersTable.email, body.email),
                eq(usersTable.name, body.username)
            )
        )
        console.log(data)
        if (data.length !== 0) {
            set.status = 409
            return "user exists"
        }

        const hash = await argon2.hash(body.password)

        await db.insert(usersTable).values({
            name: body.name,
            email: body.email,
            password: hash
        })

        auth.set({
            value: await jwt.sign(body.name),
            httpOnly: true,
            maxAge: 86400,
            path: '/'
        })

        set.status = 200;
        return "Signed up"
    }, {
        body: t.Omit(
            _createUser,
            ["id"]
        )
    })
    .post("/log-in", async ({ body, jwt, cookie: { auth }, set }: any) => {
        console.log(body)
        const user  = await db.select().from(usersTable).where(
            or(
                eq(usersTable.email, body.name),
                eq(usersTable.name, body.name)
            )
        );
        if (user.length > 1) {
            console.log("Users too many, " + user.length)
            set.status = 500
            return "Somehow many users??? TODO: DELELETE"
        }
        console.log(user)

        if (user.length === 0) {
            set.status = 404
            return "Not found"
        }

        if (await argon2.verify(user[0].password, body.password)) {
            auth.set({
                value: await jwt.sign(body.name),
                httpOnly: true,
                maxAge: 86400,
                path: '/'
            })

            set.status = 200
            return `Sign in as ${auth.value}`
        } else {
            return error(401, "Invalid credentials")
        }
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
            if (q[0].owner === Number(body.owner)) {
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
    .post("/sleeve", async ({body}: any) => {
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
