import { HttpResponse } from "msw";
import { http } from "../https";
import { ApiSchemas } from "../../schema";

type ErrorResponse = {
  message: string;
  code: string;
};

const skills: ApiSchemas["Skill"][] = [
  {
    id: "skill-1",
    name: "React Hooks",
  },
  {
    id: "skill-2",
    name: "React Router",
  },
];

export const handlers = [
  http.get("/skills", () => {
    return HttpResponse.json(skills);
  }),
  http.post("/skills", async (ctx) => {
    const data = await ctx.request.json();
    const skill = {
      id: crypto.randomUUID(),
      name: data.name,
    };
    skills.push(skill);
    return HttpResponse.json(skill);
  }),
  http.delete("/skills/{skillId}", ({ params }) => {
    const { skillId } = params;
    const index = skills.findIndex((skill) => skill.id === skillId);
    if (index === -1) {
      return HttpResponse.json<ErrorResponse>(
        { message: "Skill not found", code: "NOT_FOUND" },
        { status: 404 }
      );
    }
    skills.splice(index, 1);
    return HttpResponse.json<ErrorResponse>({
      message: "Skills have been successfully deleted",
      code: "OK",
    });
  }),
];
