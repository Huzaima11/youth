import { loginPayload, loginResponse, VerifyPhoneResponse } from '@/@types/user';
import { corePost, coreUpload, ListParams } from './api';
import { ENDPOINTS } from './endPoint';


export function buildQueryString(params?: ListParams): string {
    if (!params) return '';

    const searchParams = new URLSearchParams();

    Object.keys(params).forEach(key => {
        const value = params[key];
        if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, String(value));
        }
    });

    return searchParams.toString();
}


export async function createUser(payload: { phone: string }): Promise<any> {
    return await corePost(ENDPOINTS.REGISTER, payload);
}
export async function signInUser(payload: loginPayload): Promise<loginResponse> {
    return await corePost(ENDPOINTS.LOGIN, payload);
}
export async function forgotPassword(payload: any): Promise<any> {
    return await corePost(ENDPOINTS.FORGOT_PASSWORD, payload);
}

export async function forgotOtpVarify(payload: any): Promise<any> {
    return await corePost(ENDPOINTS.FORGOT_OTP_VARIFY, payload);
}

export async function registerOtp(payload: { otp: string }): Promise<VerifyPhoneResponse> {
    return await corePost(ENDPOINTS.REGISTER_OTP, payload);
}

export async function registerProfile(payload: any, token: string | null): Promise<any> {
    return await coreUpload(ENDPOINTS.REGISTER_PROFILE, payload, undefined, token);
}



