import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()

    const login = async (username, password) => {
        const success = handleInputErrors({username, password})
        if (!success) return

        setLoading(true)

        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({ username, password })
            })

            const data = await res.json()

            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("chat-user", JSON.stringify(data))
            setAuthUser(data)

        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, login }
}

export default useLogin

function handleInputErrors({username, password}) {
    if (!username || !password) {
        toast.error('Please fill in all the fields')
        return false
    }

    return true
}