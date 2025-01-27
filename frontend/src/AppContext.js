import axios from "axios";
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
    const [profile] = useState({id: 1, username: 'test_user',  img: getEmojiByUsername('test')});
    const [isAuth, setAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [trackData, setTrackData] = useState({});

    const fetchTrack = async () => {
        try {
            const check = await axios.get(`http://localhost:5012/api/music/check_music/${profile.id}`)
            if (check.data.check[0].id) {
                const dataJson = await axios.get(`http://localhost:5012/api/music/jsonfile/${check.data.check[0].id}`)
                const data = {
                    music: {
                            trackname: dataJson.data.audioname,
                            artist: dataJson.data.artist,
                            audioUrl: `http://localhost:5012/api/music/musicfile/${check.data.check[0].id}`}, 
                    user: {id: 2, username: 'test2', img: getEmojiByUsername('test2')}
                }
                console.log(data)
                setTrackData(data)
                console.log(trackData)
                setLoading(false)
            }
            setLoading(false)
        } catch {
            console.log('Error fetchTrack')
            setLoading(false)
        }
    }

    const fetchFriends = async () => {
        try {
            // const data = await axios.post('http://localhost:5012/api/friend/get_friends', {
            //     username: 
            // })
            const data = [
                {id: 5, username: 'test5', img: getEmojiByUsername('test5')},
                {id: 6, username: 'test6', img: getEmojiByUsername('test6')}
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
                {id: 1, trackname: 'Crockodile Rock', artist: 'Elthon John', img: getEmojiByUsername('Crockodile Rock')},
                {id: 2, trackname: 'Help!', artist: 'The Beatles', img: getEmojiByUsername('Help!')},
                {id: 3, trackname: 'Bohemian Rapsody', artist: 'Queen', img: getEmojiByUsername('Bohemian Rapsody')}
            ]
            setMusic(data)
            setLoading(false)
        } catch {
            console.log('Error while fetchFriends')
            setLoading(false)
        }
    }

    // const fetchProfile = async () => {

    // }

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
                trackData,
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