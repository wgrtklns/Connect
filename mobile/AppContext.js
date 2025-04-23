import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

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
    const [profile, setProfile] = useState(null);
    const [isAuth, setAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [trackData, setTrackData] = useState();

    // Initialize auth state and profile from storage
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const username = await AsyncStorage.getItem('username');
                
                setAuth(!!token);
                if (username) {
                    setProfile({ username });
                }
                setLoading(false);
            } catch (error) {
                console.log('Error initializing auth:', error);
                setLoading(false);
            }
        };
        
        initializeAuth();
    }, []);

    const fetchTrack = async () => {
        if (!profile?.id) return;
        
        try {
            const check = await axios.get(`http://localhost:5012/api/music/check_music/${profile.id}`);
            if (check.data.check[0].id) {
                const dataJson = await axios.get(`http://localhost:5012/api/music/jsonfile/${check.data.check[0].id}`);
                const data = {
                    music: {
                        trackname: dataJson.data.audioname,
                        artist: dataJson.data.artist,
                        audioUrl: `http://localhost:5012/api/music/musicfile/${check.data.check[0].id}`}, 
                    user: {
                        id: dataJson.data.user_id, 
                        username: dataJson.data.username, 
                        img: getEmojiByUsername(dataJson.data.username)
                    }
                };
                setTrackData(data);
                setLoading(false);
            }            
        } catch (error) {
            console.log('Error fetchTrack', error);
            setLoading(false);
        }
    };

    const fetchFriends = async () => {
        if (!profile?.username) return;
        
        try {
            const token = await AsyncStorage.getItem('token');
            const { data } = await axios.post(
                'http://localhost:5012/api/friend/get_friends',
                { username: profile.username },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            let ids = data.friends.map(friend => friend.id);

            const friendsRequests = ids.map(id => 
                axios.get(`http://localhost:5012/api/friend/get_friend/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            );

            const results = await Promise.all(friendsRequests);

            const friendsList = results.map(result => {
                const {user1, user2} = result.data;
                return user1.username === profile.username
                    ? {id: user2.id, username: user2.username}
                    : {id: user1.id, username: user1.username};
            });

            setFriends(friendsList);
        } catch (error) {
            console.log('Error while fetchFriends', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMusic = async () => {
        if (!profile?.username) return;
        
        try {
            const token = await AsyncStorage.getItem('token');
            const data = await axios.get(
                `http://localhost:5012/api/music/favorites/${profile.username}`, 
                {headers: {Authorization: 'Bearer ' + token}}
            );
            setMusic(data.data.favList);
        } catch (error) {
            console.log('Error while fetchMusic', error); 
        } finally {
            setLoading(false);
        }
    };

    const fetchProfile = async (username) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const data = await axios.get(
                `http://localhost:5012/api/user/userinfo/${username}`, 
                {headers: {Authorization: 'Bearer ' + token}}
            );
            const profileImg = getEmojiByUsername(username);

            setProfile({
                id: data.data.user_info.id, 
                username: data.data.user_info.username,  
                img: profileImg
            });
            await AsyncStorage.setItem('username', data.data.user_info.username);
        } catch (error) {
            console.log('Error fetch profile', error);
        } finally {
            setLoading(false);
        }
    };

    const addFriends = async (newFriend) => {
        if (!profile?.id) return;
        
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.post(
                `http://localhost:5012/api/friend/add_friend`,
                {mainId: profile.id, secondId: newFriend.id}, 
                {headers: {Authorization: 'Bearer ' + token}}
            );

            setFriends((prevFriends) => [...prevFriends, newFriend]);
        } catch (e) {
            console.log('Error adding friend!', e);
        }
    };

    const deleteFriends = async (friendId) => {
        if (!profile?.id) return;
        
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.delete(
                `http://localhost:5012/api/friend/delete_friend`,
                {
                    data: {mainId: profile.id, secondId: friendId},
                    headers: {Authorization: 'Bearer ' + token}
                }
            );

            setFriends((prevFriends) => prevFriends.filter((friend) => friend.id !== friendId));
        } catch (e) {
            console.log('Error deleting friend!', e);
        }
    };

    const addMusic = async (newMusic) => {
        if (!profile?.id || !trackData) return;
        
        try {
            const token = await AsyncStorage.getItem('token');
            const data = await axios.post(
                'http://localhost:5012/api/music/add_favorites',
                {
                    user_id: profile.id, 
                    original_name: trackData.music.audioUrl, 
                    audioname: trackData.music.trackname, 
                    artist: trackData.music.artist
                }, 
                {headers: {Authorization: 'Bearer ' + token}}
            );

            if (data.data.message === 'Song already in the list') {
                console.log('Song already in list');
            } else {
                console.log('Music added:', data.data.song.audioname);
            }

            setMusic((prevMusic) => [...prevMusic, newMusic]);
        } catch (error) {
            console.log('Error adding music:', error);
        }
    };

    const deleteMusic = async (musicId) => {
        if (!profile?.id || !trackData) return;
        
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.delete(
                `http://localhost:5012/api/music/delete_fav`,
                {
                    data: {
                        user_id: profile.id, 
                        audioname: trackData.music.trackname
                    },
                    headers: {Authorization: 'Bearer ' + token}
                }
            );
            setMusic((prevMusic) => prevMusic.filter((music) => music.id !== musicId));
        } catch (error) {
            console.log('Error deleting music:', error);
        }
    };

    const authUser = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            if (!token) {
                setAuth(false);
                return;
            }

            const {data} = await axios.get(
                'http://localhost:5012/api/user/authorization',
                {headers: {Authorization: 'Bearer ' + token}}
            );    

            if (data.token) {
                await AsyncStorage.setItem('token', data.token);
            } else {
                setAuth(false);
            }
        } catch (error) {
            console.log('Error auth user:', error);
            setAuth(false);
        }
    };

    const uploadMusic = async (formData) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const data = await axios.post(
                'http://localhost:5012/api/music/upload_m',
                formData, 
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log(data);
        } catch (error) {
            console.log('Error upload music', error);
        }
    };

    const changeAuth = async () => {
        setAuth(!isAuth);
    };    

    return (
        <AppContext.Provider
            value={{ 
                profile,
                friends,
                music,
                isAuth,
                isLoading,
                trackData,
                fetchProfile,
                fetchFriends,
                fetchMusic, 
                fetchTrack, 
                addFriends,
                addMusic,
                deleteFriends,
                deleteMusic,
                changeAuth,
                authUser,
                uploadMusic
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);