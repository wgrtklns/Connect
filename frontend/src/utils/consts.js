export const API_ROUTE = '/api'
export const USER_ROUTE = '/user'
export const MUSIC_ROUTE = '/music'
export const FREINDS_ROUTE = '/friend'

export const FREINDS_ROUTES = [
    {
        path: API_ROUTE + FREINDS_ROUTE + '/add_friend',
        name: 'AddFriend'
    },
    {
        path: API_ROUTE + FREINDS_ROUTE + '/get_friend/',
        name: 'GetFriend(Realtship)'
    },
    {
        path: API_ROUTE + FREINDS_ROUTE + '/get_friends',
        name: 'GetFriends'
    },
    {
        path: API_ROUTE + FREINDS_ROUTE + '/get_all_friends',
        name: 'GetAllFriends'
    },
    {
        path: API_ROUTE + FREINDS_ROUTE + '/delete_friend',
        name: 'DeleteFriend'
    }
]
