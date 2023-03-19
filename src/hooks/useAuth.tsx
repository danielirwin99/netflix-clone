import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../utils/firebase";

interface IAuth {
  // These are all the types of the function below
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

// This is a type for the children using typescript
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [initialLoading, setInitialLoading] = useState(true);

  // Persisting the user
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user);
          setLoading(false);
        } else {
          // Not logged in...
          setUser(null);
          setLoading(true);
          // Push them onto the login page
          router.push("/login");
        }

        setInitialLoading(false);
      }),
    [auth]
  );

  const signUp = async (email: string, password: string) => {
    setLoading(true);

    // User creation function with FIREBASE
    // Passing in the auth, email and password
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        // Pushes the router to the homescreen AFTER they have logged in
        router.push("/");
        setLoading(false);
      })
      .catch((error) => alert(error.message))
      //   Invokes the callback after an outcome has been settled (error or not)
      .finally(() => setLoading(false));
  };

  // Signin function
  // Passing through an email and a password with typescript
  const signIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        // Pushes the router to the homescreen AFTER they have logged in
        router.push("/");
        setLoading(false);
      })
      .catch((error) => alert(error.message))
      //   Invokes the callback after an outcome has been settled (error or not)
      .finally(() => setLoading(false));
  };

  // Our logout function in FIREBASE
  const logout = async () => {
    setLoading(true);
    // Passing in auth from firebase.tsx
    signOut(auth)
      .then(() => {
        // We want to remove the user
        setUser(null);
      })
      // Catch any errors
      .catch((error) => alert(error.message))
      // After one of the outcomes we want to change the loading to false
      .finally(() => setLoading(false));
  };

  // useMemo hook makes it more performant --> useMemo will only recompute the memoized value when one of the deps has changed.
  // Without it, it will recompute all the time
  // Its similar to useEffect
  const memoedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      loading,
      logout,
      error,
    }),
    [user, loading]
  );

  return (
    // We need to provide the value --> Including the user, the loading state etc from firebase
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  useContext(AuthContext);
}
