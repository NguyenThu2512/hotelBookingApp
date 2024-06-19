import React from 'react'
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client'
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const LogOutButton = () => {
    const {showToast} = useAppContext()
    const navigate= useNavigate()
    const queryClient=useQueryClient();

    const mutation= useMutation(apiClient.logOut, {
        onSuccess: async()=>{
            await queryClient.invalidateQueries("validateToken")
            showToast({message:"Log out successfully!", type:"SUCCESS"});
            navigate("/login")
        },
        onError: (error:Error)=>{
            showToast({message:error.message, type:"ERROR"})
        }
    })
    const handleSignOut=()=>{
        mutation.mutate()
    } 
  return (
    <button onClick={handleSignOut} className="bg-blue-600 text-white px-3 py-1 hover:bg-gray-200 hover:text-slate-900 font-semibold">
      Sign Out
    </button>
  )
}

export default LogOutButton
