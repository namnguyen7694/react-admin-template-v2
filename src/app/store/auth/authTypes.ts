import { Deserializable } from "models/common/deserializable.model";
import { ErrorModel } from "models/common/error.model";
import { GENDER } from "../customer/customerTypes";

export type AuthReducerType = {
  data: AuthOutputModel;
  loading: boolean;
  error: ErrorModel;
};

export class UserOutputModel implements Deserializable<UserOutputModel> {
  id: number;
  profile: {
    name: string;
    avatar_url: string;
    dob: string | null;
    gender: GENDER;
  };
  email: string;
  created_at: string;
  is_active: boolean;
  groups: string[];

  deserialize?(input: any): UserOutputModel {
    this.id = input.id ?? undefined;
    this.profile = input.profile ?? { name: "", avatar_url: "", dob: null, gender: GENDER.OTHER };
    this.email = input.email ?? "";
    this.created_at = input.created_at ?? null;
    this.is_active = input.is_active ?? true;
    this.groups = input.groups ?? [];
    return this;
  }
}

export type AuthOutputModel = {
  token: string | null;
  refreshToken: string | null;
  user: UserOutputModel;
};
