import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";

type Session = {
  session: {
    id: string;
    userId: string;
    // ...
  };
  user: {
    id: string;
    // ...
  };
};

export default async function middleware(request: NextRequest) {
  // O betterFetch consulta a rota da sua API criada no route.ts
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  const isLoginPage = request.nextUrl.pathname.startsWith("/login");

  // Se não tem sessão e não está na página de login -> Manda pro Login
  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se tem sessão e está tentando acessar o login -> Manda pra Home
  if (session && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // O matcher define quais rotas passam pelo middleware.
  // Ignora arquivos estáticos, imagens e rotas da API para otimizar performance.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};