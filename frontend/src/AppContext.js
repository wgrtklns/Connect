import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext()

const getEmojiByUsername = (username) => {
    const baseCodePoint = 0x1F600; 
    const range = 0x1F64F - 0x1F600; 
    const charSum = [...username].reduce((sum, char) => sum + char.charCodeAt(0), 0);

    const emojiCodePoint = baseCodePoint + (charSum % range);
    
    return String.fromCodePoint(emojiCodePoint);
};

export const AppContextProvider = ({children}) => {
    const [friends, setFriends] = useState([]);
    const [music, setMusic] = useState([]);
    const [profile] = useState({id: 1, username: 'AMus', artist: 'Annom', img: getEmojiByUsername('AMus')});
    const [isAuth, setAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [trackdata, setTrackdata] = useState()

    const fetchTrack = async () => {
        try {
            const data = [{
                music: {
                    trackname: "Black Privilegge",
                    artist: "Dr.Dre",
                    filename: "TEST",
                    audioUrl: "C:\Users\bogda\Desktop\Dr_Dre_-_Black_Privilege.mp3"
                }, 
                user: { 
                    id: 1, username: 'bob', img: getEmojiByUsername('bob')
                }
            }]
            setTrackdata(data)
            console.log(trackdata)
            setLoading(false)
        } catch {
            console.log('Error fetchTrack')
            setLoading(false)
        }
    }

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

    useEffect(() => {
        fetchTrack()
        fetchFriends()
        fetchMusic()
    }, [])

    const addFriends = async (newFriend) => {
        try {
            setFriends((prevFriends) => [...prevFriends, newFriend])
        } catch (e) {
            console.log('Error adding friend!', e)
        }
    }

    const deleteFriends = async(friendId) => {
        try {
            setFriends((prevFriends) => prevFriends.filter((friend) => friend.id !== friendId));
        } catch (e) {
            console.log('Error deleting friend!', e)
        }
    }

    const addMusic = async (newMusic) => {
        try {
            setMusic((prevMusic) => [...prevMusic, newMusic]);
            console.log('Music added:', newMusic);
        } catch (error) {
            console.log('Error adding music:', error);
        }
    };

    const deleteMusic = async (musicId) => {
        try {
            setMusic((prevMusic) => prevMusic.filter((music) => music.id !== musicId));
            console.log('Music deleted:', musicId);
        } catch (error) {
            console.log('Error deleting music:', error);
        }
    };

    const authUser = async () => {
        localStorage.getItem('token')
        const response = 'data'
        if (response) {
            localStorage.setItem(response, 'token')
        }
    }

    const changeAuth = async () => {
        setAuth(!isAuth)
    }

    return (
        <AppContext.Provider
            value={{ 
                profile,
                friends,
                music,
                isAuth,
                isLoading,
                trackdata,
                fetchFriends,
                fetchMusic,
                addFriends,
                addMusic,
                deleteFriends,
                deleteMusic,
                changeAuth,
                authUser
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)