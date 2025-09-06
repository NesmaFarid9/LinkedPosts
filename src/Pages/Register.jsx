import { Button, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sendRegisterData } from "../Services/authServices";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { schema } from "../Schema/RegisterSchema";



export default function Register() {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);
    const navigate = useNavigate();

    
    // React Hook Form
    // Handle Submit => prevent loading
    const {handleSubmit, register, formState:{errors, touchedFields}} = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            dateOfBirth: '',
            gender: ''
        },
        // for validation
        resolver: zodResolver(schema),
        mode: 'onBlur',
        reValidateMode: 'onBlur'
    });
    async function singUp(userData){
        // console.log(userData);
        setLoading(true);
        const response = await sendRegisterData(userData);
        // console.log(response);
        
        if(response?.token){
            navigate("/login");      
        }
        else{
            setApiError(response?.error);     
        }
        setLoading(false);
        console.log(response);
    }
    // console.log('errors', errors);
    
    return <>
        <div className="bg-white shadow-2xl rounded-2xl py-10 px-6 min-w-md">
            <h1 className='text-center text-2xl pb-4'>Register</h1>
            <form onSubmit={handleSubmit(singUp)} className="flex flex-col gap-4">
                <Input isInvalid={Boolean(errors.name) && touchedFields.name} errorMessage={errors.name?.message} variant="bordered" label='Name' {...register('name')}  type="text" />

                <Input isInvalid={Boolean(errors.email) && touchedFields.email} errorMessage={errors.email?.message} variant="bordered" label='Email' {...register('email')} type="email" />
  
                <Input isInvalid={Boolean(errors.password) && touchedFields.password} errorMessage={errors.password?.message} variant="bordered" label='Password' {...register('password')}  type="password" />

                <Input isInvalid={Boolean(errors.rePassword) && touchedFields.rePassword} errorMessage={errors.rePassword?.message} variant="bordered" label='Confirm Password' {...register('rePassword')} type="password" />

                <div className="flex gap-4">
                    <Input isInvalid={Boolean(errors.dateOfBirth) && touchedFields.dateOfBirth} errorMessage={errors.dateOfBirth?.message} variant="bordered" label='DataOfBirth' {...register('dateOfBirth')} type="date" />

                    <Select isInvalid={Boolean(errors.gender) && touchedFields.gender} errorMessage={errors.gender?.message} variant="bordered" label='Gender' {...register('gender')} >
                        <SelectItem key="male">Male</SelectItem>
                        <SelectItem key="female">Female</SelectItem>
                    </Select>
                </div>
                <Button isLoading={loading} type="submit" color="primary">Register</Button>
                <div className="text-center">If you have an account <Link to={'/login'} className="text-blue-400">SignIn</Link></div>
                {apiError && <span className="text-center text-red-600">{apiError}</span>}
            </form>
        </div>
    </>    
}
