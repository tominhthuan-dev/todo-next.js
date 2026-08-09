import {NextResponse} from "next/server";
import * as authService from "@/server/services/auth.service";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const user = await authService.register(body.username, body.password);
        return NextResponse.json(user, {status: 201});
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}