const request = require("supertest")
const app = require("./app.js")


describe("GET Poll", () => {
    it("Poll 1 does exist therefore status code is 200", async () => {
        const res =  await request(app).get("/1");
        expect(res.statusCode).toBe(200);
    });

    it("Poll 2 does not exist therefore status code is 404", async () => {
        const res =  await request(app).get("/2");
        expect(res.statusCode).toBe(404);
    });

    it("Poll 3 does not exist therefore status code is 404", async () => {
        const res =  await request(app).get("/3");
        expect(res.statusCode).toBe(404);
    });

    it("Random url does not exist therefore status code is 404", async () => {
        const res =  await request(app).get("/dsadsad");
        expect(res.statusCode).toBe(404);
    });

    it("Catch all redirects for first poll", async () => {
        const res =  await request(app).get("/dsadsad/73827");
        expect(res.header.location).toBe("/1");
    });

}),

describe("Post Poll data", () => {
    it("Redirect to results page if chosen has value", async () => {
        const res =  await request(app).post("/1").send({
            chosen: "Liverpool"
        }); 
        expect(res.header.location).toEqual("/results1");
    });

    it("Redirect to results page even if poll does not exist", async () => {
        const res =  await request(app).post("/3").send({
            chosen: "Liverpool"
        });
        expect(res.header.location).toEqual("/results3");
    });

    it("Redirect back to page if nothing selected", async () => {
        const res =  await request(app).post("/1").send({
            chosen:""
        });
        expect(res.header.location).toEqual("/1");
    });
}),

describe("Get Data", () => {
    it("Send Json Data", async () => {
        const res =  await request(app).get("/data");
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toEqual(expect.stringContaining("json"));
    });
})