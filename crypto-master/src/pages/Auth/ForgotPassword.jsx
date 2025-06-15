import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { sendResetPassowrdOTP } from "@/Redux/Auth/Action";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPasswordForm = () => {
  const [verificationType, setVerificationType] = useState("EMAIL");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    data.navigate = navigate;
    dispatch(
      sendResetPassowrdOTP({
        sendTo: data.email,
        navigate,
        verificationType,
      })
    );
  };

  return (
    <div className="space-y-8 text-white">
      <h1 className="text-center text-xl md:text-2xl font-normal text-white">
        Forgot Password
      </h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <input
            type="email"
            {...form.register("email")}
            placeholder="Enter your email"
            className="w-full px-5 py-4 bg-[#0f0f0f] bg-opacity-80 border border-[#0aefff50] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0aefff] transition duration-300"
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm mt-2">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0aefff] to-[#0aff99] text-black font-extrabold tracking-wide hover:scale-105 transform transition duration-300 shadow-lg"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
