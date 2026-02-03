import { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: {
            id: string,
            role:  "artisan" | "buyer",
        } & DefaultSession["user"];
    }

    interface User {
      id: string;
      role:  "artisan" | "buyer";
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role:  "artisan" | "buyer";
        id: string;
    }
}

