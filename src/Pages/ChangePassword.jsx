import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { changePasswordApi } from '../Services/authServices';
import { Input } from '@heroui/input';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@heroui/react';
import { changePasswordSchema } from './../Schema/changePassSchema';
import { AuthContext } from './../Context/AuthContext';

export default function ChangePassword() {
    const [isLoading, setIsLoading] = useState(false);
    const {setIsLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    const { handleSubmit, register, reset, formState: { errors, touchedFields }} = useForm({
        defaultValues: {
            oldPassword: '',
            newPassword: ''
        },
        resolver: zodResolver(changePasswordSchema),
        mode: 'onBlur',
        reValidateMode: 'onBlur'
    });
    async function ChangePass({ oldPassword, newPassword }) {
        setIsLoading(true);
        try {
            const response = await changePasswordApi({ oldPassword, newPassword });
            if (response?.message) {
                setIsLoggedIn(true);
                localStorage.removeItem("token");
                reset();
                navigate("/login");
            }
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    }

    return (
        <div className="min-h-[88vh] flex justify-center items-center">
            <div className='w-4/12 mx-auto'>
                <div className='bg-white py-10 px-6 rounded-2xl shadow-2xl min-w-md'>
                <h1 className='text-center text-2xl pb-4'>Change Password</h1>
                <form onSubmit={handleSubmit(ChangePass)} className='flex flex-col gap-4'>
                    <Input
                        isInvalid={Boolean(errors.oldPassword) && touchedFields.oldPassword}
                        errorMessage={errors.oldPassword?.message}
                        variant='bordered'
                        label="OldPassword"
                        {...register('oldPassword')}
                        type='password'/>
                    <Input
                        isInvalid={Boolean(errors.newPassword) && touchedFields.newPassword}
                        errorMessage={errors.newPassword?.message}
                        variant='bordered'
                        label="New Password"
                        {...register('newPassword')}
                        type='password'/>
                    <Button isLoading={isLoading} type='submit' color="primary">
                        Change Password
                    </Button>
                    {/* <div className="text-center">If you have an account <Link to={'/login'} className="text-blue-400">SignIn</Link></div> */}
                </form>
            </div>
            </div>      
        </div>
    );
}
