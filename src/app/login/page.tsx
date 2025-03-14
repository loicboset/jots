'use client'

import type { JSX } from 'react';

import Link from "next/link";
import { useForm } from "react-hook-form";

import Button from '@/components/ui/buttons/Button';

import { login } from "./actions";

export type FormValues = {
  email: string;
  password: string;
}

const Login = (): JSX.Element => {
  // RHF
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>();

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-indigo-500 text-5xl font-semibold tracking-tight text-pretty text-center">DevLog</h1>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Log in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={(handleSubmit(login))} className="space-y-6">
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
                    block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1
                    outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2
                    focus:outline-indigo-500 sm:text-sm/6
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
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div> */}
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
                  autoComplete="current-password"
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
              <Button
                type="submit"
                className='w-full'
                isLoading={isSubmitting}
              >
                Log in
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?{' '}
            <Link href="/signup" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Create an account now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
