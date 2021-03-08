import { ErrorModel } from "models/common/error.model";
import PaginationOutputModel from "models/pagination.output.model";

import { Deserializable } from "models/common/deserializable.model";

export enum GENDER {
  MALE = 1,
  FEMALE = 2,
  OTHER = 3,
}
export class CustomerOutputModel implements Deserializable<CustomerOutputModel> {
  id: number;
  user_identity: string;
  avatar_url: string;
  created_at: string;
  is_active: boolean;
  kyc_verified: boolean;

  deserialize?(input: any): CustomerOutputModel {
    this.id = input.id ?? undefined;
    this.user_identity = input.user_identity ?? "";
    this.created_at = input.created_at ?? null;
    this.is_active = input.is_active ?? true;
    this.avatar_url = input.avatar_url ?? "";
    this.kyc_verified = input.kyc_verified ?? false;
    return this;
  }
}

export class CustomerDetailOutputModel implements Deserializable<CustomerDetailOutputModel> {
  id: number;
  email: string | null;
  phone_number: string | null;
  device_sn: string | null;
  profile: {
    name: string;
    avatar_url: string;
    dob: string | null;
    gender: GENDER;
  };
  created_at: string;
  is_active: boolean;
  kyc: KycModel;
  groups: string[];

  deserialize?(input: any): CustomerDetailOutputModel {
    this.id = input.id ?? undefined;
    this.email = input.email ?? null;
    this.phone_number = input.phone_number ?? null;
    this.device_sn = input.device_sn ?? null;
    this.created_at = input.created_at ?? null;
    this.is_active = input.is_active ?? true;
    this.profile = input.profile ?? { name: "", avatar_url: "", dob: null, gender: GENDER.OTHER };
    this.kyc = input.kyc ?? new KycModel().deserialize!({});
    this.groups = input.groups ?? [];
    return this;
  }
}

export class KycModel implements Deserializable<KycModel> {
  id: string;
  activation_request: string;
  fullname: string;
  gender: string;
  dob: string;
  id_number: string;
  issue_place: string;
  issue_date: string;
  expiry_date: string;
  nationality: string;
  arrival_destination: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  address: string;

  sim_card_img: string;
  id_front_img: string;
  id_back_img: string;
  signature_img: string;
  selfie_img: string;
  user: number;

  deserialize?(input: any): KycModel {
    this.id = input.id ?? "";
    this.activation_request = input.activation_request ?? "";
    this.fullname = input.fullname ?? "";
    this.gender = input.gender ?? "";
    this.dob = input.dob ?? "";
    this.id_number = input.id_number ?? "";
    this.issue_place = input.issue_place ?? "";
    this.issue_date = input.issue_date ?? "";
    this.expiry_date = input.expiry_date ?? "";
    this.nationality = input.nationality ?? "";
    this.arrival_destination = input.arrival_destination ?? "";
    this.province = input.province ?? "";
    this.district = input.district ?? "";
    this.ward = input.ward ?? "";
    this.street = input.street ?? "";
    this.address = input.address ?? "";

    this.sim_card_img = input.sim_card_img ?? "";
    this.id_front_img = input.id_front_img ?? "";
    this.id_back_img = input.id_back_img ?? "";
    this.signature_img = input.signature_img ?? "";
    this.selfie_img = input.selfie_img ?? "";
    this.user = input.user ?? 0;

    return this;
  }
}

export type CustomerListReducerType = {
  listing: PaginationOutputModel<CustomerOutputModel[]>;
  loading: boolean;
  error: ErrorModel;
};
