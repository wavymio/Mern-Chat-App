import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const useGetConversations = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        console.log('useEffect triggered')
        const getConversations = async () => {
            setLoading(true)
            console.log('Fetching conversations...')

            try {
                const res = await fetch(`${API_BASE_URL}/api/users`, {
                    credentials: 'include'
                })

                const data = await res.json()

                if (data.error) {
                    console.log("the error is from here")
                    throw new Error(data.error)
                }

                setConversations(data)
            } catch (err) {
                toast.error(err.message)
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        getConversations()
    }, [])

    return { loading, conversations }
}

export default useGetConversations
