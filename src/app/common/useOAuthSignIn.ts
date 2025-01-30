// hooks/useOAuthSignIn.ts
import { FirebaseError } from "firebase/app";
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
    } catch (error: unknown) {
      // Use FirebaseError for more accurate error handling
      if (error instanceof FirebaseError) {
        console.error(
          `Error with ${provider.providerId} sign-in:`,
          error.message
        );
        return { success: false, message: error.message };
      } else {
        // Fallback for unexpected error types
        console.error("An unknown error occurred during sign-in", error);
        return { success: false, message: "An unexpected error occurred." };
      }
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
