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
    const [profile] = useState({id: 3, username: 'test3',  img: getEmojiByUsername('test')});
    const [isAuth, setAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [trackData, setTrackData] = useState({ music: {}, user: {} });

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
                    user: {id: 2, username: 'test2', img: getEmojiByUsername('test22')}
                }
                setTrackData(data)
                setLoading(false)
            }
        } catch {
            console.log('Error fetchTrack')
            setLoading(false)
        }
    }

    const fetchFriends = async () => {
        try {
            const data = await axios.post('http://localhost:5012/api/friend/get_friends', {
                username: profile.username
            }, {headers: {Authorization:'1 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ0ZXN0M0AxIiwidXNlcm5hbWUiOiJ0ZXN0MyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzM5MzUzNjg0LCJleHAiOjE3Mzk0NDAwODR9.Gai3ICBnnQYlRCJpRDSIGl4iC8acdrN9YwdYTU7o_9w'}})
            setFriends(data.data.friends)
            setLoading(false)
        } catch {
            console.log('Error while fetchFriends')
            setLoading(false)
        }
    }

    const fetchMusic = async () => {
        try {
            const data  = await axios.post(`http://localhost:5012/api/music/favorites/${profile.username}`)
            setMusic(data.data.favorites)
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
        const info = {
            user_id: profile.id,
            original_name: trackData.music.audioUrl,
            audioname: trackData.music.trackname,
            artist: trackData.music.artist
        }
        console.log('....', info)
        try {
            setMusic((prevMusic) => [...prevMusic, newMusic]);
            const data = await axios.post('http://localhost:5012/api/music/add_favorites', info , {headers: {Authorization:'1 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ0ZXN0M0AxIiwidXNlcm5hbWUiOiJ0ZXN0MyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzM5MzUzNjg0LCJleHAiOjE3Mzk0NDAwODR9.Gai3ICBnnQYlRCJpRDSIGl4iC8acdrN9YwdYTU7o_9w'}})
            if (data.data.message === 'Song already in the list') {
                console.log('Song already in list')
            } else {
                // console.log('Music added:', data.data.message);
            }
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

    // const uploadMusic = async() => {
    //     try {
    //         const uploadM = axios.post('http://localhost:5012/api/music/upload_m', {})
    //     } catch (error) {
    //         console.log('Error upload music')
    //     }
    // }


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