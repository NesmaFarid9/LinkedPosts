import { useContext, useState } from "react";
import { Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../Schema/loginSchema";
import { sendLoginData } from "../Services/authServices";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import loginImage from "../assets/login.avif";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn, getLoggedUserData } = useContext(AuthContext);

  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur"
  });

  async function signIn(data) {
    setLoading(true);
    try {
      const response = await sendLoginData(data);
      if (response?.token) {
        localStorage.setItem("token", response.token);
        setIsLoggedIn(true);
        await getLoggedUserData();
        navigate("/");
      } else {
        setApiErrors(response?.error || "Login failed");
      }
    } catch (err) {
      console.error("login error:", err);
      setApiErrors("Login error");
    } finally {
      setLoading(false);
    }
  }

  return (

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="flex bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 max-w-4xl w-full overflow-hidden">
        <div className="hidden md:flex w-1/2">
          <img src={loginImage} alt="Login" className="object-cover w-full h-full" />
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-semibold text-center text-gray-800">Welcome Back 👋</h1>
          <p className="text-center text-gray-500 mt-2 mb-6">Please login to continue</p>

          <form onSubmit={handleSubmit(signIn)} className="flex flex-col gap-5">
            <Input
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              variant="bordered"
              label="Email"
              {...register("email")}
            />
            <div className="relative">
              <Input
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
                variant="bordered"
                label="Password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="focus:outline-none text-gray-500 hover:text-gray-700 transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
              />
            </div>


            <div className="flex justify-end">
              <Link to="/change-password" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <Button isLoading={loading} type="submit" color="primary">Login</Button>

            {apiErrors && <div className="text-center text-red-500">{apiErrors}</div>}
          </form>

          <div className="text-center mt-6 text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500">Register</Link>
          </div>
        </div>
      </div>
    </div>

    // <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
    //   <div className="flex bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200">
    //     <div className="hidden md:flex w-1/2">
    //       <img src={loginImage} alt="Login" className="" />
    //     </div>

    //     <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
    //       <h1 className="text-3xl font-semibold text-center text-gray-800">Welcome Back 👋</h1>
    //       <p className="text-center text-gray-500 mt-2 mb-6">Please login to continue</p>

    //       <form onSubmit={handleSubmit(signIn)} className="flex flex-col gap-5">
    //         <Input isInvalid={!!errors.email} errorMessage={errors.email?.message} variant="bordered" label="Email" {...register("email")} />
    //         <Input isInvalid={!!errors.password} errorMessage={errors.password?.message} variant="bordered" label="Password" {...register("password")} type="password" />

    //         <div className="flex justify-end">
    //           <Link to="/change-password" className="text-sm text-blue-500 hover:underline">Forgot Password?</Link>
    //         </div>

    //         <Button isLoading={loading} type="submit" color="primary">Login</Button>

    //         {apiErrors && <div className="text-center text-red-500">{apiErrors}</div>}
    //       </form>

    //       <div className="text-center mt-6 text-gray-600">
    //         Don’t have an account? <Link to="/register" className="text-blue-500">Register</Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
