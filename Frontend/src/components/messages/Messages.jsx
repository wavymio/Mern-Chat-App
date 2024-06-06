import React from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import useListenMessages from '../../hooks/useListenMessages'

const Messages = () => {
    const {messages, loading} = useGetMessages()
	// console.log("new Messages: ", messages)
	useListenMessages()

	return (
        <div className='px-4 flex-1 overflow-auto'>
			{!loading && messages.length > 0 &&
				messages.map((message, idx) => (
					<Message key={message._id} message={message} />
				))
			}
			
			{loading &&
				[...Array(3)].map((arr, idx) => <MessageSkeleton key={idx} />)
			}

			{!loading && messages.length === 0 && (
				<p className="text-center">Send a message to start the conversation</p>
			)}
		</div>
    )
}

export default Messages
