interface user {
  name: string;
  phone: string;
  image: string;

}

export interface loginResponse {
  token: string;
  user: user;
}

export interface loginPayload {
  phone: string;
  password: string;
}

export interface VerifyPhoneResponse {

  profile_completed: boolean
  profile_token: string
  user_exists: boolean
}