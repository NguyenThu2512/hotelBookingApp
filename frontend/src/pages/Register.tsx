import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import * as apiClient from '../api-client'
import { useAppContext } from '../contexts/AppContext'

export type RegisterFormData={
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}

const Register = () => {
    const navigate= useNavigate()
    const {showToast}= useAppContext()
    const {register, watch, handleSubmit, formState: {errors }}= useForm<RegisterFormData>()
    const queryClient=useQueryClient();

    const mutation=useMutation(apiClient.register,{
        onSuccess: async() =>{
            await queryClient.invalidateQueries("validateToken")
            showToast({message: "Registration success!", type: "SUCCESS"});
            navigate("/")
        },
        onError: (error: Error)=>{
            showToast({message: error.message, type: "ERROR"});

        }
    }  )
    const onSubmit=handleSubmit((data)=>{
        mutation.mutate(data);
    })
  return (
    <div className="">
        <h2 className="font-bold text-3xl">Create an account</h2>
 
        <form className='flex flex-col gap-3' onSubmit={onSubmit}>
            <div>
                <label htmlFor="" className="font-semibold text-gray-700 text-sm">
                    <span  className="">First name</span>
                </label>
                <input type="text" placeholder="Nguyen Thi" className="w-full px-2 py-2 border "  {...register("firstName", {required: "This field is required"})}/>
                {errors.firstName && (
                    <span className='text-red-500'>{errors.firstName.message}</span>
                )}
            </div>
            <div>
                <label htmlFor="" className="font-semibold text-gray-700 text-sm">
                    <span  className="">Last name</span>
                </label>
                <input type="text" placeholder="Thu" className="w-full px-2 py-2 border" {...register("lastName", {required: "This field is required"})} />
                {errors.lastName && (
                    <span className='text-red-500'>{errors.lastName.message}</span>
                )}
            </div>
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
                <label htmlFor="" className="font-semibold text-gray-700 text-sm">
                    <span  className="">Confirm Password</span>
                </label>
                <input type="password" placeholder="Reenter Password" className="w-full px-2 py-2 border" 
                {...register("confirmPassword", {
                    validate: (val)=>{
                        if(!val){
                            return "This field is required";
                        }else if(watch("password")!==val){
                            return "Your passwords do not match"
                        }
                    }
                })} />
                {errors.confirmPassword && (
                    <span className='text-red-500'>{errors.confirmPassword.message}</span>
                )}
            </div>
            <Link to={'/login'} className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                Already have an account?
            </Link>
            <div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2" type="submit" > 
                    Sign Up
                </button>
            </div>
        </form>
      
    </div>
  )
}

export default Register
