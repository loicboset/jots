"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

import Header from "@/components/collections/layouts/Header";
import Button from "@/components/ui/buttons/Button";
import useAlert from "@/utils/hooks/useAlert";

import { resetPassword } from "./actions";

export type FormValues = {
  password: string;
  repeatPassword: string;
};

const ResetPassword = (): React.ReactElement => {
  // RHF
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  // HOOKS
  const [alert, setAlert, clearAlert] = useAlert();

  // METHODS
  const handleResetPassword = async (data: FormValues): Promise<void> => {
    clearAlert();

    const { message, type } = await resetPassword(data.password);
    if (message) {
      setAlert({ message, type });
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link href="/">
            <h1 className="text-indigo-500 text-5xl font-semibold tracking-tight text-pretty text-center">
              Jots
            </h1>
          </Link>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Reset Your Password
          </h2>
          {alert && <div className="mt-4">{alert}</div>}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit(handleResetPassword)}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-white"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                  type="password"
                  required
                  className={`
                    block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1
                    outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2
                    focus:outline-indigo-500 sm:text-sm/6
                  `}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-white"
                >
                  Repeat Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  {...register("repeatPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  type="password"
                  required
                  className={`
                    block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1
                    outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2
                    focus:outline-indigo-500 sm:text-sm/6
                  `}
                />
                {errors.repeatPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.repeatPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full" isLoading={isSubmitting}>
                Reset Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
