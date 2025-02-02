import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext()

const getEmojiByUsername = (username) => {
    const baseCodePoint = 0x1F600; 
    const range = 0x1F64F - 0x1F600; 

    // Суммируем коды символов имени пользователя
    const charSum = [...username].reduce((sum, char) => sum + char.charCodeAt(0), 0);

    // Преобразуем сумму в индекс в диапазоне эмодзи
    const emojiCodePoint = baseCodePoint + (charSum % range);

    return String.fromCodePoint(emojiCodePoint);
};

export const AppContextProvider = ({children}) => {
    const [friends, setFriends] = useState([]);
    const [music, setMusic] = useState([]);
    const [profile] = useState({username: 'Meeeno', img: getEmojiByUsername('Meeeno')});
    const [isAuth, setAuth] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const [trackdata, setTrackData] = useState([]);

    const fetchFriends = async () => {
        try {
            const data = [
                {id: 1, username: 'bob', img: getEmojiByUsername('bob')},
                {id: 2, username: 'alex', img: getEmojiByUsername('alex')},
                {id: 3, username: 'max', img: getEmojiByUsername('max')}
            ]
            setFriends(data)
            setLoading(false)
        } catch {
            console.log('Error while fetchFriends')
            setLoading(false)
        }
    }

    const fetchMusic = async () => {
        try {
            const data = [
                {id: 1, username: 'AMus', artist: 'Annom', img: getEmojiByUsername('AMus')},
                {id: 2, username: 'BobMus', artist: 'Annom', img: getEmojiByUsername('BobMus')},
                {id: 3, username: 'Miramax', artist: 'Annom', img: getEmojiByUsername('Miramax')}
            ]
            setMusic(data)
            setLoading(false)
        } catch {
            console.log('Error while fetchFriends')
            setLoading(false)
        }
    }

    const fetchTrack = async () => {
        try {
            const data = [
                {artist: 'Kanye West', name: 'I Wonder', audio: 'pass'}
            ]
            setFriends(data)
            setLoading(false)
        } catch {
            console.log('Error while fetchTrack')
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFriends()
        fetchMusic()
        fetchTrack()
    }, [])

    const addFriends = async () =>  {
            
    }

    const addMusic = async () => {

    }

    const

    return (
        <AppContext.Provider
            value={{ 
                profile,
                friends,
                music,
                isAuth,
                isLoading,
                fetchFriends,
                fetchMusic,  
                addFriends,
                addMusic,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)