import { useGetUserQuery } from "@/redux/features/auth/authApi"
import { logOut, setUser } from "@/redux/features/auth/authSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const useGetProfile = () => {
    // const isAuthenticated = useSelector((state:any) => state.auth.isAuthenticated)
    // const user = useSelector((state:any) => state.auth.isAuthenticated)
    // console.log(isAuthenticated)
    const {data, isLoading, isError} = useGetUserQuery(undefined,{
        // refetchOnFocus: false,
        // refetchOnMountOrArgChange: false,
        // refetchOnReconnect: false,
        // skip: !!isAuthenticated
    })
    const dispatch = useDispatch()
    useEffect(() => {
        if(data){
            dispatch(setUser(data))
        }else if(isError){
            dispatch(logOut())
        }
    },[isError, dispatch, data])
    return {user:data?.data, isLoading}
}
