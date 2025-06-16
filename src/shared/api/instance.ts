import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { ApiPaths } from "./schema";
import { CONFIG } from "./../model/config";

export const fetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
});

export const rqClient = createClient(fetchClient);
