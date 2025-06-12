import createHooks from "openapi-react-query";
import { api } from "./api";

export const { useQuery, useMutation } = createHooks(api);
