const request = require("supertest")
const app = require('./app')

describe("App Tests", () => {
    test("GET /", async () => {
        const res = await request(app).get("/")
        
        expect(res.status).toBe(200)
        expect(res.body.info).toMatch(/journal/i)
    })

    test("GET /categries", async () => {
        const res = await request(app).get("/categories")
        const expected = [/food/i, /coding/i, /other/i]

        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toMatch(/json/i)

        expect(res.body.length).toBe(3)
        expect(res.body[0].name).toMatch(/food/i)
        res.body.forEach((cat, index) => {
            expect(cat.name).toMatch(expected[index])
        })
    })

    test("POST /entries", async () => {
        const res = await request(app)
            .post("/entries")
            .send({
                cat_id: 1,
                content: 'Test Entry'
            })

        expect(res.status).toBe(200)
        // expect(res.body.id).toBeTruthy()
    })
})