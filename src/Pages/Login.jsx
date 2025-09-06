import  { useContext, useState } from 'react'
import { Button, Input } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '../Schema/loginSchema';
import { sendLoginData } from '../Services/authServices';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [apiErrors, setApiErrors] = useState(false);
    const navigate =  useNavigate();
    const {setIsLoggedIn} = useContext(AuthContext);

    const {handleSubmit, register, formState:{errors, touchedFields}} = useForm({
        defaultValues:{
            email: '',
            password: ''
        },
        resolver: zodResolver(schema),
        mode: 'onBlur',
        reValidateMode: 'onBlur'
    });
    async function singIn(userData){
        setLoading(true);
        const response = await sendLoginData(userData); 
        if(response?.message){
            localStorage.setItem('token', response.token);
            setIsLoggedIn(response.token);
            navigate('/');
        }
        else{
            setApiErrors(response?.error)
        }
        setLoading(false);
        console.log(response);
        

    }
    return <>
        <div className='bg-white py-10 px-6 rounded-2xl shadow-2xl min-w-md'>
            <h1 className='text-center text-2xl pb-4'>Login</h1>
            <form onSubmit={handleSubmit(singIn)} className='flex flex-col gap-4'>
                <Input isInvalid={Boolean(errors.email) && touchedFields.email} errorMessage={errors.email?.message} variant='bordered' label="Email" {...register('email')} type="email" />
                <Input className='pb-' isInvalid={Boolean(errors.password) && touchedFields.password} errorMessage={errors.password?.message} variant='bordered' label="Password" {...register('password')} type='password'/>
                {/* <Link to={'/change-password'} className='text-red-700 text-sm pt-0'>Change Password</Link> */}
                <Button isLoading={loading} type='submit' color="primary">Login</Button>
                <div className="text-center">If you don't have an account <Link to={'/register'} className='text-blue-400'>Register</Link></div>
                {apiErrors && <span className='text-center text-red-500'>{apiErrors}</span>}
            </form>

        </div>
    </>
}
