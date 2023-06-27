import { SET_PERMISSIONS } from "../constants/Permission";

const initialState = {
    permissions: []
};

export const permissionReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_PERMISSIONS:
            return { ...state, permissions: payload };
        default:
            return state;
    }
}