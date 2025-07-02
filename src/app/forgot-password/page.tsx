'use client'

import type { JSX } from 'react';

import Link from "next/link";
import { useForm } from "react-hook-form";

import Header from '@/components/collections/layouts/Header';
import Button from '@/components/ui/buttons/Button';
import useToast from '@/utils/hooks/useToast';

import { sendResetPasswordLink } from "./actions";

export type FormValues = {
  email: string;
}

const ForgotPassword = (): JSX.Element => {
  // RHF
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>();

  // HOOKS
  const [alert, setAlert, clearAlert] = useToast();

  // METHODS
  const handleForgotPassword = async (data: FormValues): Promise<void> => {
    clearAlert();

    const { message, type } = await sendResetPasswordLink(data.email);
    if (message) {
      setAlert({ message, type });
    }
  }

  return (
    <>
      <Header />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link href="/">
            <h1 className="text-indigo-500 text-5xl font-semibold tracking-tight text-pretty text-center">Jots</h1>
          </Link>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Forgot Password?</h2>
          {alert && <div className="mt-4">{alert}</div>}
        </div>


        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={(handleSubmit(handleForgotPassword))} className="space-y-6">
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
              <Button
                type="submit"
                className='w-full'
                isLoading={isSubmitting}
              >
                Send a reset link
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

export default ForgotPassword;