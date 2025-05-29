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
    .post("/sign-up", async ({ body, jwt, set }: any) => {

        // Check if user exists
        const data = await db.select().from(usersTable).where(
            or(
                eq(usersTable.email, body.email),
                eq(usersTable.name, body.username)
            )
        )
        if (data.length !== 0) {
            set.status = 409
            return "user exists"
        }

        const hash = await argon2.hash(body.password)

        const user = await db.insert(usersTable).values({
            name: body.name,
            email: body.email,
            password: hash
        }).returning();

        const val = await jwt.sign(user[0])


        return "Signed up"
    }, {
        body: t.Omit(
            _createUser,
            ["id"]
        )
    })
    .post("/log-in", async ({ body, jwt, set }: any) => {
        const user  = await db.select().from(usersTable).where(
            or(
                eq(usersTable.email, body.name),
                eq(usersTable.name, body.name)
            )
        );

        if (user.length > 1) {
            throw new Error("Query Resulted in 2+ users.")
        }

        if (user.length === 0) {
            set.status = 404
            return "User not found"
        }

        if (await argon2.verify(user[0].password, body.password)) {
            const val = await jwt.sign(user[0])

            // token auth

            set.status = 200
            return `Sign in as ${val}`
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
    .post("/boards/", async ({body, jwt, cookie: { auth }, set, headers}: any) => {
        const user = await jwt.verify(auth.value)

        if (!user) {
            set.status = 401
            return "Unauthorized"
        }

        set.status = 200
        return db.select().from(boardsTable).where(eq(boardsTable.owner, user.id));
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
