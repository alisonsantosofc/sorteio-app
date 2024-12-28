export interface IUserSession {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  id?: string;
  isAdmin?: boolean;
  validated?: boolean;
}