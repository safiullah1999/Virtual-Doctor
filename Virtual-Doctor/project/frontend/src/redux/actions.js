import { UPDATE_USER } from './actionTypes.js'

export const updateUser = (userID, userType, account) => {
    return {
        type: UPDATE_USER,
        userID: userID,
        userType: userType,
        account: account
    }
}