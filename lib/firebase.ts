import {
  getApp,
  getApps,
  initializeApp,
  type FirebaseOptions,
} from "firebase/app";

import {
  getAuth,
} from "firebase/auth";

import {
  initializeFirestore,
} from "firebase/firestore";

function requireEnv(
  name: string,
  value: string | undefined
): string {
  const cleanedValue =
    value?.trim();

  if (!cleanedValue) {
    throw new Error(
      `${name} nije definisan.`
    );
  }

  return cleanedValue;
}

const firebaseConfig:
  FirebaseOptions = {
  apiKey: requireEnv(
    "NEXT_PUBLIC_FIREBASE_API_KEY",
    process.env
      .NEXT_PUBLIC_FIREBASE_API_KEY
  ),

  authDomain: requireEnv(
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    process.env
      .NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  ),

  projectId: requireEnv(
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    process.env
      .NEXT_PUBLIC_FIREBASE_PROJECT_ID
  ),

  messagingSenderId: requireEnv(
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    process.env
      .NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  ),

  appId: requireEnv(
    "NEXT_PUBLIC_FIREBASE_APP_ID",
    process.env
      .NEXT_PUBLIC_FIREBASE_APP_ID
  ),
};

const app =
  getApps().length > 0
    ? getApp()
    : initializeApp(
        firebaseConfig
      );

export const auth =
  getAuth(app);

export const db =
  initializeFirestore(
    app,
    {
      experimentalForceLongPolling:
        true,
    }
  );

export default app;