/* eslint-disable no-unused-vars */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/Redux/Auth/Action";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";

const formSchema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  email: z.string().email("Invalid email address").optional(),
  password: z.string().min(8, "Password must be at least 8 characters long").optional(),
});

const SignupForm = () => {
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });

  const onSubmit = (data) => {
    data.navigate = navigate;
    dispatch(register(data));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg ">
        <h1 className="text-2xl font-semibold text-center text-[#202124] mb-6">
          Create your account
        </h1>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              type="text"
              {...form.register("fullName")}
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-[#dadce0] rounded-md bg-white text-[#202124] placeholder-[#80868b] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] transition"
            />
            {form.formState.errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              {...form.register("email")}
              placeholder="Email"
              className="w-full px-4 py-3 border border-[#dadce0] rounded-md bg-white text-[#202124] placeholder-[#80868b] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] transition"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...form.register("password")}
              placeholder="Password"
              className="w-full px-4 py-3 border border-[#dadce0] rounded-md bg-white text-[#202124] placeholder-[#80868b] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] transition"
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {!auth.loading ? (
            <button
              type="submit"
              className="w-full py-3 bg-[#1a73e8] text-white font-semibold rounded-md hover:bg-[#1558d6] transition"
            >
              Sign Up
            </button>
          ) : (
            <SpinnerBackdrop show={true} />
          )}
        </form>
      </div>
    </div>
  );
};

export default SignupForm;