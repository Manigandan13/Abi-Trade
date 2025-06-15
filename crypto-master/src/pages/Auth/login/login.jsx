import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "@/Redux/Auth/Action";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    data.navigate = navigate;
    dispatch(login(data));
  };

  return (
    <div className="space-y-8 text-[#202124]">
      <h1 className="text-center text-2xl font-semibold">
        Sign in to your account
      </h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div>
          <input
            type="email"
            {...form.register("email")}
            placeholder="Email"
            className="w-full px-4 py-3 border border-[#dadce0] rounded-md bg-white text-[#202124] placeholder-[#80868b] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] transition"
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm mt-2">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            {...form.register("password")}
            placeholder="Password"
            className="w-full px-4 py-3 border border-[#dadce0] rounded-md bg-white text-[#202124] placeholder-[#80868b] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] transition"
          />
          {form.formState.errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#1a73e8] text-white font-semibold rounded-md hover:bg-[#1558d6] transition"
        >
          {auth.loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;