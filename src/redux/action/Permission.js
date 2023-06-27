import { SET_PERMISSIONS } from "../constants/Permission";

export const setPermissions = (permissions) => {

    return {
        type: SET_PERMISSIONS,
        payload: permissions
    };
};