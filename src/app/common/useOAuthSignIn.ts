// hooks/useOAuthSignIn.ts
import { auth } from "../../../firebase/firebaseConfig";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
  AuthProvider,
} from "firebase/auth";

interface SignInResult {
  success: boolean;
  message?: string;
}

export const useOAuthSignIn = () => {
  const signInWithProvider = async (
    provider: AuthProvider
  ): Promise<SignInResult> => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(`Signed in with ${provider.providerId}:`, result.user);
      return { success: true };
    } catch (error: any) {
      console.error(`Error with ${provider.providerId} sign-in:`, error);
      return { success: false, message: error.message };
    }
  };

  const signInWithGoogle = (): Promise<SignInResult> => {
    const provider = new GoogleAuthProvider();
    return signInWithProvider(provider);
  };

  const signInWithFacebook = (): Promise<SignInResult> => {
    const provider = new FacebookAuthProvider();
    return signInWithProvider(provider);
  };

  const signInWithApple = (): Promise<SignInResult> => {
    const provider = new OAuthProvider("apple.com");
    return signInWithProvider(provider);
  };

  return {
    signInWithGoogle,
    signInWithFacebook,
    signInWithApple,
  };
};
