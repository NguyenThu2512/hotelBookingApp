import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client'
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

export type SignInFormData={
    email: string;
    password: string;
}

const Login = () => {
    const {register, formState: {errors},handleSubmit } =useForm<SignInFormData>()
    const {showToast}= useAppContext()
    const navigate= useNavigate()
    const queryClient=useQueryClient();

    const mutation=useMutation(apiClient.signIn, {
        onSuccess: async()=>{
            await queryClient.invalidateQueries("validateToken")
            showToast({message:"Loggin successfully!", type:"SUCCESS"});
            navigate('/')
        },
        onError:(error: Error)=>{
            showToast({message:error.message, type:"ERROR"})
        }
    })

    const onSubmit=handleSubmit((data)=>{
        mutation.mutate(data)
    })
  return (
    <div>
        <form className='flex flex-col gap-5' onSubmit={onSubmit}>
            <h2 className='text-3xl font-bold'>Sign In</h2>
            <div>
                <label htmlFor="" className="font-semibold text-gray-700 text-sm">
                    <span  className="">Email</span>
                </label>
                <input type="email" placeholder="abc@gmail.com" className="w-full px-2 py-2 border" {...register("email", {required: "This field is required"})} />
                {errors.email && (
                    <span className='text-red-500'>{errors.email.message}</span>
                )}
            </div>
            <div>
                <label htmlFor="" className="font-semibold text-gray-700 text-sm">
                    <span  className="">Password</span>
                </label>
                <input type="password"  placeholder="Enter Password" className="w-full px-2 py-2 border " 
                {...register("password", {required: "This field is required", minLength:{value: 6, message: "Password must be at least 6 characters"}})} />
                {errors.password && (
                    <span className='text-red-500'>{errors.password.message}</span>
                )}
            </div>
            <div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2" type="submit" > 
                    Log In
                </button>
            </div>

        </form>
      
    </div>
  )
}

export default Login
