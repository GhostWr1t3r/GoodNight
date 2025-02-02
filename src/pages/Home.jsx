import React, { useEffect, useState } from 'react';
import TermsModal from '../components/Home/TermsModal';
import HomePage from '../components/Home/HomePage';
import { socket } from '../Socket';
import { useChat } from '../contextApi/ChatContext';

const Home = () => {
    const { userId, receiver, isSearching, setReceiver, setIsTyping, setMessage, setIsSearching } = useChat()
    const [isTermsModal, setIsTermsModal] = useState(false);

    useEffect(() => {
        if (userId && isSearching) {
            socket.emit("unpairing-user", userId, () => {
                setIsSearching(false)
            })
        }

        if (receiver) {
            socket.emit("chat-close", receiver, () => {
                setReceiver("")
                setIsTyping(false)
                setMessage("")
            })
        }
    }, [userId, isSearching, receiver]);

    return (
        <>
            <HomePage setIsTermsModal={setIsTermsModal} />
            {isTermsModal && <TermsModal setIsTermsModal={setIsTermsModal} />}

        </>
    )
}

export default Home

