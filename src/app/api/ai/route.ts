import { NextResponse } from "next/server";

type Body = {
    prompt?: string;
};

export async function POST(req: Request) {
    const body = (await req.json()) as Body;
    const prompt = body.prompt ?? "";

    // TODO: 여기에서 Vercel AI SDK / OpenAI / 사내 LLM과 연동
    const answer =
        "이 엔드포인트는 현재 데모용 더미 응답을 반환합니다.\n\n" +
        "프롬프트:\n" +
        prompt +
        "\n\n" +
        "실서비스에서는 Vercel AI SDK를 사용해 FIELD NINE 내부 데이터와 연결된 " +
        "Generative UI 응답을 생성하도록 교체하면 됩니다.";

    return NextResponse.json({ answer });
}

