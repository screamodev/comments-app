import { User } from "../../../users/entities/user.entity";

export type AuthResponse = {
  user: User;
  token: string;
};
