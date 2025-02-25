'use client'

import type { JSX } from 'react';

import Link from "next/link";
import { useForm } from "react-hook-form";

import { signup } from "./actions";

export type FormValues = {
  email: string;
  password: string;
  repeatPassword: string;
}

const Signup = (): JSX.Element => {
  // RHF
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-indigo-500 text-5xl font-semibold tracking-tight text-pretty text-center">DevLog</h1>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Create a new account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={(handleSubmit(signup))} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  {...register('email', {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address"
                    }
                  })}
                  type="email"
                  required
                  autoComplete="email"
                  className={`
                    block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1
                    -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2
                    focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6
                  `}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  {...register('password', {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long"
                    }
                  })}
                  type="password"
                  required
                  className={`
                    block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1
                    outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2
                    focus:outline-indigo-500 sm:text-sm/6
                  `}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                  Repeat Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  {...register('repeatPassword', {
                    required: "Please confirm your password",
                    validate: value => value === watch('password') || "Passwords do not match"
                  })}
                  type="password"
                  required
                  className={`
                    block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1
                    outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2
                    focus:outline-indigo-500 sm:text-sm/6
                  `}
                />
                {errors.repeatPassword && <p className="text-red-500 text-sm">{errors.repeatPassword.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`
                  flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white
                  shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2
                  focus-visible:outline-indigo-500
                `}
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Already a member?{' '}
            <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
