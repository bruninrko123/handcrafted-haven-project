import { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: {
            id: string,
            role: "seller" | "artisan" | "buyer",
        } & DefaultSession["user"];
    }

    interface User {
      id: string;
      role: "seller" | "artisan" | "buyer";
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: "seller" | "artisan" | "buyer";
        id: string;
    }
}

