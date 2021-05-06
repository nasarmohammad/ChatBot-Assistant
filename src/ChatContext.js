import React, { useState, createContext, useEffect } from 'react';
import uuid from 'react-uuid';

export const ChatContext = createContext();

const ChatContextProvider = (props) => {

    const [messages, setMessages] = useState([]);
    const [showUserInput, setShowUserInput] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const pendingMessages = [
        [
            { message: "Hi! I am John, I'm customer support representative.", id: uuid(), isAdmin: true },
            { message: "How can I help you with your order today?", id: uuid(), isAdmin: true },
            { message: "Do you want help with your recent order delivery?", id: uuid(), isAdmin: true }
        ],
        [
            { message: "Do you like to get it delivered or want to change the delivery to a pickup?", id: uuid(), isAdmin: true }
        ],
        [
            { message: "Your delivery is set for next week, would you like to change your delivery date?", id: uuid(), isAdmin: true },
        ],
        [
            { message: "What is your desired date?", id: uuid(), isAdmin: true }
        ],
        [
            { message: "Thankyou for walking me through your preferences, Your package will be delivered accordingly, Have a great day ahead!", id: uuid(), isAdmin: true }
        ]
    ];

    const addNextAdminMessage = () => {
        setIsLoading(true);
        setShowUserInput(false);
        setTimeout(() => {
            setIsLoading(false);
            setShowUserInput(true);
            setMessages(messages => {
                const userMessageCount = messages.reduce((count, message) => {
                    if (!message.isAdmin) {
                        count++;
                    }
                    return count;
                }, 0);
                return [
                    ...messages,
                    ...pendingMessages[userMessageCount]
                ]
            })
        }, 2000);
    }

    useEffect(() => {
        addNextAdminMessage();
    }, []);

    const userClickedYes = (userMessage) => {
        setMessages(messages => [
            ...messages,
            { message: userMessage, id: uuid(), isAdmin: false }
        ]);
        addNextAdminMessage();
    }

    const userClickedNo = (userMessage) => {
        setMessages(messages => [
            ...messages,
            { message: userMessage, id: uuid(), isAdmin: false }
        ]);
        addNextAdminMessage();
    }

    const deleteMessages = (id) => {
        const index = messages.findIndex(message => message.isAdmin === false && message.id === id);
        setMessages(messages => messages.slice(0, index));
    }

    const userSelectedDate = (day) => {
        setMessages(messages => [
            ...messages,
            { message: day.toLocaleDateString(), id: uuid(), isAdmin: false }
        ]);
        addNextAdminMessage();

    }

    const resetChat = () => {
        setMessages([]);
        addNextAdminMessage();
    }

    return (
        <ChatContext.Provider value={{ messages, resetChat, userSelectedDate, userClickedYes, userClickedNo, deleteMessages, isLoading, showUserInput }}>
            {props.children}
        </ChatContext.Provider>
    );
}

export default ChatContextProvider;