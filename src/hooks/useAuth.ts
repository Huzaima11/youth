// useAuth.ts

import { loginPayload } from "@/@types/user";
import { createUser, forgotOtpVarify, forgotPassword, registerOtp, registerProfile, signInUser } from "@/configs/corePoint";
import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";

type AsyncState = {
  loading: boolean;
  error: string | null;
};

type ProfileState = AsyncState & { token: string | null };

type AuthStates = {
  register: AsyncState;
  login: AsyncState;
  otp: AsyncState;
  profile: ProfileState;
  forgot: AsyncState;
  forgotOtp: AsyncState;
};

export const useAuth = () => {
  const { login } = useAuthContext();

  const [states, setStates] = useState<AuthStates>({
    register: { loading: false, error: null },
    login: { loading: false, error: null },
    otp: { loading: false, error: null },
    profile: { loading: false, error: null, token: null },
    forgot: { loading: false, error: null },
    forgotOtp: { loading: false, error: null },
  });

  // generic state updater
  const setAsyncState = <K extends keyof AuthStates>(
    key: K,
    newState: Partial<AuthStates[K]>
  ) => {
    setStates((prev) => ({
      ...prev,
      [key]: { ...prev[key], ...newState },
    }));
  };

  // --- Register ---
  const registerUser = async (phone: string) => {
    setAsyncState("register", { loading: true, error: null });

    try {
      return await createUser({ phone });
    } catch (err: any) {
      setAsyncState("register", { error: err?.message || "An unexpected error occurred" });
      return null;
    } finally {
      setAsyncState("register", { loading: false });
    }
  };

  // --- Login ---
  const loginUser = async (payload: loginPayload) => {
    setAsyncState("login", { loading: true, error: null });

    try {
      const response = await signInUser(payload);
      //   toast.success("Login successful!");
      if (response?.token) {
        login(response.token);
        // Cookies.set("auth_token", response.token, { expires: 1 });
      }
      return response;
    } catch (err: any) {
      setAsyncState("login", { error: err?.message || "An unexpected error occurred" });
      return null;
    } finally {
      setAsyncState("login", { loading: false });
    }
  };

  // --- Forgot Password ---
  const sendResetCode = async (payload: any) => {
    setAsyncState("forgot", { loading: true, error: null });

    try {
      return await forgotPassword(payload);
    } catch (err: any) {
      setAsyncState("forgot", { error: err?.message || "An unexpected error occurred" });
      return null;
    } finally {
      setAsyncState("forgot", { loading: false });
    }
  };

  const forgotCode = async (otp: string) => {
    setAsyncState("forgotOtp", { loading: true, error: null });

    try {
      return await forgotOtpVarify({ otp });
    } catch (err: any) {
      setAsyncState("forgotOtp", { error: err?.message || "An unexpected error occurred" });
      return null;
    } finally {
      setAsyncState("forgotOtp", { loading: false });
    }
  };

  // --- Register OTP ---
  const handleRegisterOtp = async (otp: string) => {
    setAsyncState("otp", { loading: true, error: null });

    try {
      const response = await registerOtp({ otp });
      const token = response?.profile_token;
      setAsyncState("profile", { token });
      return { success: true, token, response };
    } catch (err: any) {
      setAsyncState("otp", { error: err?.message || "An unexpected error occurred" });
      return { success: false, token: null };
    } finally {
      setAsyncState("otp", { loading: false });
    }
  };

  // --- Register Profile ---
  const handleRegisterProfile = async (payload: any, token?: string) => {
    setAsyncState("profile", { loading: true, error: null });

    const tokenToUse = token || states.profile.token;

    try {
      return await registerProfile(payload, tokenToUse);
    } catch (err: any) {
      setAsyncState("profile", { error: err?.message || "An unexpected error occurred" });
      return null;
    } finally {
      setAsyncState("profile", { loading: false });
    }
  };

  return {

    states,
    // register

    registerUser,

    // otp

    handleRegisterOtp,

    // profile

    handleRegisterProfile,

    // login

    loginUser,

    // forgot password

    sendResetCode,

    // forgot otp

    forgotCode,
  };
};
