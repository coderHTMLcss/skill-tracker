// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";
import { skills } from "./mock-data"; // твої мокові скіли

export const handlers = [
  http.get("/api/skills", () => {
    return HttpResponse.json(skills);
  }),

  http.post("/api/skills", async ({ request }) => {
    const newSkill = await request.json();
    return HttpResponse.json(newSkill, { status: 201 });
  }),
];
