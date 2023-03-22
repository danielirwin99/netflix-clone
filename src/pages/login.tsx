import useAuth from "@/hooks/useAuth";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";

// Allows us to enter in a string value to our form inputs
interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();

  // Allows us to use these react-hook imports from react-hook
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  // We want this function to fire when when fill out the form
  // Our two inputs from the useForm above are email and password --> We have them listed below in register
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    // If the user clicked on the signin button
    if (login) {
      await signIn(email, password);
    } else {
      // Signs us up if we are not signed in
      await signUp(email, password);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Netflix Clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img
        src="https://rb.gy/p2hphi"
        className="-z-10 !hidden opacity-30 sm:!inline absolute w-full h-full"
        style={{ objectFit: "cover" }}
        alt="Login Image"
      />
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />
      <form
        className="relative rounded space-y-8 bg-black/75 py-10 mt-24 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              // Here is our Email
              {...register("email", { required: true })}
            />
            {errors.email && (
              // Fires back this error if there is no email below the input
              <p className="p-1 text-[13px] font-light text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              // Here is our password
              {...register("password", { required: true })}
            />

            {errors.password && (
              // Fires back this error if there is no password below the input
              <p className="p-1 text-[13px] font-light text-orange-500">
                Your password must contain between 4 and 60 characters
              </p>
            )}
          </label>
        </div>
        <button
          className="w-full rounded bg-[#e50914] py-3 font font-semibold"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>
        <div className="text-[gray]">
          New To Netflix?{" "}
          <button
            className="text-white hover:underline"
            onClick={() => setLogin(false)}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
