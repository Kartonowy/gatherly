import {db} from "./index.js";
import {boardsTable, sleeveTable, usersTable} from "./schema.js";

import * as argon2 from "argon2";

await db.insert(usersTable).values(
    [
        {
            name: "hacunae",
            email: "hacunae@iusevimbtw.com",
            password: await argon2.hash("superhardomegapassword"),
        },
        {
            name: "someone_else",
            email: "someother@iusevimbtw.com",
            password: await argon2.hash("alsohardpassword"),
        }
    ]
);
await db.insert(boardsTable).values(
    [
        {
            name: "D\&D stuff",
            owner: 1,
        },
        {
            name: "School research",
            owner: 1
        },
        {
            name: "School research",
            owner: 2
        },
        {
            name: "Cool youtube videos",
            owner: 2
        },
        {
            name: "Vocaloids",
            owner: 1
        },
    ]
);
await db.insert(sleeveTable).values(
    [
        {
            name: "Encounter generator",
            url: "https://koboldplus.club/",
            summary: "Website for easily accessible and balanced fights in 5e.",
            tags: [],
            board: 1,
            position_x: 243,
            position_y: 669,
        },
        {
            name: "Dungeon generator",
            url: "https://dungeonscrawl.com/",
            summary: "Website for creation of dungeons, mostly 5e.",
            tags: [],
            board: 1,
            position_x: 160,
            position_y: 100,
        },
        {
            name: "Scientific calculator",
            url: "https://numbar.dev/",
            summary: "high precision scientific calc with units",
            tags: [],
            board: 2,
            position_x: 112,
            position_y: 0,
        },
        {
            name: "wikipedia",
            url: "https://wikipedia.com/",
            summary: "wikipedia duh",
            tags: [],
            board: 2,
            position_x: 112,
            position_y: 100,
        },
        {
            name: "Langdev on ARM?!",
            url: "https://youtu.be/3ZWQZrB2ag8?si=1pLJi84EAiFzGeOr",
            summary: "Tsoding stream on B lang on aarch64",
            tags: [],
            board: 4,
            position_x: 621,
            position_y: 431,
        },
        {
            name: "dwm.c",
            url: "https://www.youtube.com/watch?v=l-f5KgibVfI",
            summary: "Bread on her dwm!",
            tags: [],
            board: 4,
            position_x: 499,
            position_y: 237,
        },
        {
            name: "bang bang vim",
            url: "https://www.youtube.com/watch?v=SNAMMWBHUPM",
            summary: "sylvan returns again with his vim videos",
            tags: [],
            board: 4,
            position_x: 67,
            position_y: 9,
        },
        {
            name: "Confessions of a Rotten girl",
            url: "https://www.youtube.com/watch?v=sV2H712ldOI&pp=ygUIc2F3dG93bmU%3D",
            summary: "MIKU",
            tags: [],
            board: 5,
            position_x: 0,
            position_y: 0,
        },
        {
            name: "M@GICAL☆CURE! LOVE ♥ SHOT!",
            url: "https://www.youtube.com/watch?v=LaEgpNBt-bQ&pp=ygUIc2F3dG93bmXSBwkJjQkBhyohjO8%3D",
            summary: "MIKU",
            tags: [],
            board: 5,
            position_x: 120,
            position_y: 0,
        },
        {
            name: "Tetoris",
            url: "https://www.youtube.com/watch?v=Soy4jGPHr3g",
            summary: "TETO",
            tags: [],
            board: 5,
            position_x: 67,
            position_y: 697,
        },
    ]
);
