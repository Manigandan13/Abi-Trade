import React from "react";
import { useDispatch } from "react-redux";
import { verifyResetPassowrdOTP } from "@/Redux/Auth/Action";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const formSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords & Confirm Password must match")
    .min(8, "Password must be at least 8 characters long")
    .required("Confirm password is required"),
  otp: yup
    .string()
    .min(6, "OTP must be at least 6 characters long")
    .required("OTP is required"),
});

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { session } = useParams();

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
      otp: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(
      verifyResetPassowrdOTP({
        otp: data.otp,
        password: data.password,
        session,
        navigate,
      })
    );
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <div className="bg-[#0f0f0f] border border-[#0aefff50] rounded-2xl shadow-2xl p-10 w-[90%] max-w-xl space-y-6">
        <h1 className="text-center text-3xl font-extrabold text-[#0aefff]">
          Reset Your Password
        </h1>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-2 text-lg text-[#0aff99]">Verify OTP</label>
            <input
              type="text"
              maxLength={6}
              {...form.register("otp")}
              placeholder="Enter 6 digit OTP"
              className="w-full py-4 px-5 rounded-xl border border-[#0aefff50] bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#0aff99]"
            />
            {form.formState.errors.otp && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.otp.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-lg text-[#0aff99]">New Password</label>
            <input
              type="password"
              {...form.register("password")}
              placeholder="New password"
              className="w-full py-4 px-5 rounded-xl border border-[#0aefff50] bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#0aff99]"
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-lg text-[#0aff99]">Confirm Password</label>
            <input
              type="password"
              {...form.register("confirmPassword")}
              placeholder="Confirm password"
              className="w-full py-4 px-5 rounded-xl border border-[#0aefff50] bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#0aff99]"
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0aefff] to-[#0aff99] text-black font-extrabold tracking-wide hover:scale-105 transform transition duration-300 shadow-lg"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
