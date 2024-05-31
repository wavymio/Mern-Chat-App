import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'

function useGetMessages() {
    const [loading, setLoading] = useState(false)
    const {messages, setMessages, selectedConversation} = useConversation()

    // UseEffect is used here because we want the function to run immediatley
    useEffect(() => {
        const getMessages = async () => {
            try {
                setLoading(true)

                const  res = await fetch(`http://localhost:8080/api/messages/${selectedConversation._id}`, {
                    credentials: 'include'
                })

                const data = await res.json()

                if (data.error) throw new Error(data.error)
                setMessages(data)
            } catch (err) {
                toast.error(err.message)
            } finally {
                setLoading(false)
            }
        }
        if (selectedConversation?._id) getMessages()
    }, [selectedConversation?._id, setMessages])

    return { messages, loading }
}

export default useGetMessages
