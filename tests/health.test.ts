import app from "../src/index";
import supertest from "supertest"

// app.get("/health", (req: Request, res: Response) => res.status(httpStatus.OK).send(`I'm okay!`));

const api = supertest(app);

describe("GET /health", () => {
  it("should return status 200 and I'm okay :)", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe(`I'm okay!`);
  });
});