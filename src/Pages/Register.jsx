import { Button, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { sendRegisterData } from "../Services/authServices";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { schemaReg } from "../Schema/registerSchema";
import registerImage from "../assets/register.avif";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            dateOfBirth: "",
            gender: "",
        },
        resolver: zodResolver(schemaReg),
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    async function signUp(userData) {
        setLoading(true);
        const response = await sendRegisterData(userData);
        if (response?.token) {
            navigate("/");
        } else {
            setApiError(response?.error);
        }
        setLoading(false);
    }

    return (
        <div className="flex justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-10">
            <div className="flex bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-5xl w-full overflow-hidden">

                {/* Left Image */}
                <div className="hidden md:flex w-1/2">
                    <img
                        src={registerImage}
                        alt="Register Illustration"
                        className="object-cover w-full h-auto"
                    />
                </div>

                {/* Right Form */}
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-center text-blue-500 pb-10">
                        Create Account
                    </h1>

                    <form onSubmit={handleSubmit(signUp)} className="flex flex-col gap-5">
                        <Input
                            isInvalid={!!errors.name}
                            errorMessage={errors.name?.message}
                            variant="bordered"
                            label="Full Name"
                            {...register("name")}
                            type="text"
                            className="rounded-xl"
                        />

                        <Input
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message}
                            variant="bordered"
                            label="Email"
                            {...register("email")}
                            type="email"
                            className="rounded-xl"
                        />

                        {/* Password */}
                        <Input
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message}
                            variant="bordered"
                            label="Password"
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            className="rounded-xl"
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

                        {/* Confirm Password */}
                        <Input
                            isInvalid={!!errors.rePassword}
                            errorMessage={errors.rePassword?.message}
                            variant="bordered"
                            label="Confirm Password"
                            {...register("rePassword")}
                            type={showConfirmPassword ? "text" : "password"}
                            className="rounded-xl"
                            endContent={
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="focus:outline-none text-gray-500 hover:text-gray-700 transition"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            }
                        />

                        <div className="flex gap-4 flex-col md:flex-row">
                            <Input
                                isInvalid={!!errors.dateOfBirth}
                                errorMessage={errors.dateOfBirth?.message}
                                variant="bordered"
                                label="Date of Birth"
                                {...register("dateOfBirth")}
                                type="date"
                                className="rounded-xl w-full"
                            />

                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        isInvalid={!!errors.gender}
                                        errorMessage={errors.gender?.message}
                                        variant="bordered"
                                        label="Gender"
                                        className="rounded-xl w-full"
                                    >
                                        <SelectItem key="male" value="male">Male</SelectItem>
                                        <SelectItem key="female" value="female">Female</SelectItem>
                                    </Select>
                                )}
                            />
                        </div>

                        <Button
                            isLoading={loading}
                            type="submit"
                            color="primary"
                            size="lg"
                            className="rounded-xl shadow-md hover:shadow-lg transition-all"
                        >
                            Register
                        </Button>

                        {apiError && (
                            <span className="text-center text-red-600 font-medium">   
                                {apiError}
                            </span>
                        )}
                    </form>

                    <div className="text-center mt-6 text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500 font-medium hover:underline">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>


        // <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
        //     <div className="flex bg-white rounded-2xl shadow-2xl border border-gray-200">

        //         <div className="hidden md:flex w-1/2">
        //             <img
        //                 src={registerImage}
        //                 alt="Register Illustration"
        //                 className=""
        //             />
        //         </div>

        //         <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
        //             <h1 className="text-3xl font-bold text-center text-blue-500 pb-10">
        //                 Create Account
        //             </h1>

        //             <form onSubmit={handleSubmit(signUp)} className="flex flex-col gap-5">
        //                 <Input
        //                     isInvalid={!!errors.name}
        //                     errorMessage={errors.name?.message}
        //                     variant="bordered"
        //                     label="Full Name"
        //                     {...register("name")}
        //                     type="text"
        //                     className="rounded-xl"
        //                 />

        //                 <Input
        //                     isInvalid={!!errors.email}
        //                     errorMessage={errors.email?.message}
        //                     variant="bordered"
        //                     label="Email"
        //                     {...register("email")}
        //                     type="email"
        //                     className="rounded-xl"
        //                 />
        //                 <div className="relative">
        //                     <Input
        //                         isInvalid={!!errors.password}
        //                         errorMessage={errors.password?.message}
        //                         variant="bordered"
        //                         label="Password"
        //                         {...register("password")}
        //                         type={showPassword ? "text" : "password"}
        //                         className="rounded-xl"
        //                         endContent={
        //                             <button
        //                                 type="button"
        //                                 onClick={() => setShowPassword(!showPassword)}
        //                                 className="focus:outline-none text-gray-500 hover:text-gray-700 transition"
        //                             >
        //                                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        //                             </button>
        //                         }
        //                     />
        //                 </div>

        //                 <div className="relative">
        //                     <Input
        //                         isInvalid={!!errors.rePassword}
        //                         errorMessage={errors.rePassword?.message}
        //                         variant="bordered"
        //                         label="Confirm Password"
        //                         {...register("rePassword")}
        //                         type={showConfirmPassword ? "text" : "password"}
        //                         className="rounded-xl"
        //                         endContent={
        //                             <button
        //                                 type="button"
        //                                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        //                                 className="focus:outline-none text-gray-500 hover:text-gray-700 transition"
        //                             >
        //                                 {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        //                             </button>
        //                         }
        //                     />
        //                 </div>

        //                 <div className="flex gap-4 flex-col md:flex-row">
        //                     <Input
        //                         isInvalid={!!errors.dateOfBirth}
        //                         errorMessage={errors.dateOfBirth?.message}
        //                         variant="bordered"
        //                         label="Date of Birth"
        //                         {...register("dateOfBirth")}
        //                         type="date"
        //                         className="rounded-xl w-full"
        //                     />

        //                     {/* FIXED: Controller for Select */}
        //                     <Controller
        //                         name="gender"
        //                         control={control}
        //                         render={({ field }) => (
        //                             <Select
        //                                 {...field}
        //                                 isInvalid={!!errors.gender}
        //                                 errorMessage={errors.gender?.message}
        //                                 variant="bordered"
        //                                 label="Gender"
        //                                 className="rounded-xl w-full"
        //                             >
        //                                 <SelectItem key="male" value="male">
        //                                     Male
        //                                 </SelectItem>
        //                                 <SelectItem key="female" value="female">
        //                                     Female
        //                                 </SelectItem>
        //                             </Select>
        //                         )}
        //                     />
        //                 </div>

        //                 <Button
        //                     isLoading={loading}
        //                     type="submit"
        //                     color="primary"
        //                     size="lg"
        //                     className="rounded-xl shadow-md hover:shadow-lg transition-all"
        //                 >
        //                     Register
        //                 </Button>

        //                 {apiError && (
        //                     <span className="text-center text-red-600 font-medium">
        //                         {apiError}
        //                     </span>
        //                 )}
        //             </form>

        //             <div className="text-center mt-6 text-gray-600">
        //                 Already have an account?{" "}
        //                 <Link
        //                     to="/login"
        //                     className="text-blue-500 font-medium hover:underline"
        //                 >
        //                     Sign In
        //                 </Link>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}
