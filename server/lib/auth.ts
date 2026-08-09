import { verifyAccessToken } from "./jwt";

export function getUserFromToken(request: Request) {
    const authorization = request.headers.get("Authorization");
    console.log("Authorization:", authorization);

    if (!authorization) {
        throw new Error("Unauthorized");
    }

    const token = authorization.split(" ")[1];
    console.log("Token:", token);

    const payload = verifyAccessToken(token);
    console.log("Payload:", payload);

    return payload;
}