import 'next-auth';

declare module 'next-auth' {
  interface DefaultSession {
    user?: {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
      id?: string | null | undefined;
      isAdmin?: boolean | null | undefined;
      validated?: boolean | null | undefined;
    }
  }
}