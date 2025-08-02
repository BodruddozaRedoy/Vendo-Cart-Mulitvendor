import { useGetUserQuery } from "@/redux/features/auth/authApi"
import { logOut, setUser } from "@/redux/features/auth/authSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const useGetProfile = () => {
    const {data:user, isLoading, isError} = useGetUserQuery(undefined,{
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false,
        refetchOnReconnect: false
    })
    const dispatch = useDispatch()
    useEffect(() => {
        if(user){
            dispatch(setUser(user))
        }else if(isError){
            dispatch(logOut())
        }
    },[user, isError, dispatch])
    return {user, isLoading}
}