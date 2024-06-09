import { useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const {messages, setMessages, selectedConversation} = useConversation()

    const sendMessage = async (message) => {
        setLoading(true) 

        try {
            const res = await fetch(`${API_BASE_URL}/api/messages/send/${selectedConversation._id}`, {
                method: 'POST',
                headers: {"Content-Type": 'application/json'},
                credentials: "include",
                body: JSON.stringify({message})
            })

            const data = await res.json()
            if (data.error) throw new Error(data.error)


            setMessages([...messages, data])

        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return {sendMessage, loading}
}

export default useSendMessage