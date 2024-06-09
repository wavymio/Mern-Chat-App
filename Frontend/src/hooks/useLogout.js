import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const logout = async () => {
        setLoading(true)
        try {

            const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                credentials: 'include'
            })

            const data = await res.json()

            if (data.error) {
                throw new Error(data.error)
            }
             
            localStorage.removeItem('chat-user')
            setAuthUser(null)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return {loading, logout}

}

export default useLogout
