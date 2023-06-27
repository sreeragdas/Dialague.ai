import { client } from '../axios';
import { makeAutoObservable } from 'mobx';
// import { NotificationManager } from 'react-notifications';

export class UserStore {
    userList = [];
    userById = null;
    roleList = [];

    constructor() {
        makeAutoObservable(this);
    }

    setUserTable(value) {
        this.userList = value;
    }

    setUserById(value) {
        this.userById = value;
    }

    setRoleList(value) {
        this.roleList = value;
    }

    async getUserTableList() {
        try {
            const response = await client.get('/user/');
            this.setUserTable(response.data);
            const response1 = await client.get('/groups/');
            this.setRoleList(response1.data);
            console.log(this.userList, 'user list');
        } catch (error) {
            // NotificationManager.error(
            //     (client.isclientError(error) && error.message) || (error instanceof Error && error.message) || (error),
            //     '',
            //     3000
            // );
        }
    }

    async getRoleList() {
        try {
            const response = await client.get('/groups/');
            this.setRoleList(response.data);
            console.log(this.roleList, 'role list');
        } catch (error) {
            // NotificationManager.error(
            //     (client.isclientError(error) && error.message) || (error instanceof Error && error.message) || (error),
            //     '',
            //     3000
            // );
        }
    }

    async addUserData(data) {
        console.log(data, 'from store');
        try {
            data.groups = Array.from(String(data.groups), Number);
            await client.post('/create-user/', { ...data });
            // NotificationManager.success('Successfully added...', '', 3000);
            return true;
        } catch (error) {
            if (error.response && error.response.status === 502) {
                // NotificationManager.error('bad gateway error');
            } else if (error.response && error.response.status === 400) {
                // NotificationManager.error('User with this email already exists.');
            } else {
                // NotificationManager.error('internal error ');
            }
        }
        return false;
    }

    async deleteUserData(data) {
        console.log(data, 'row from store');
        try {
            const response = await client.delete(`/user/${data}/`);
            // NotificationManager.success('Successfully deleted...', '', 3000);
        } catch (error) {
            // NotificationManager.error(
            //     (client.isclientError(error) && error.message) || (error instanceof Error && error.message) || (error)
            // );
        }
    }

    async getEditingUser(id) {
        try {
            const response = await client.get(`/user/${id}/`);
            this.setUserById(response.data);
        } catch (error) {
            // NotificationManager.error(
            //     (client.isclientError(error) && error.message) || (error instanceof Error && error.message) || (error)
            // );
            throw error;
        }
    }

    async getEditedUser(value, id) {
        console.log(id, 'from edit idddd');
        try {
            value.groups = Array.from(String(value.groups), Number);
            await client.patch(`http://20.65.184.13/ui/api/update-user/${id}/`, { ...value });
            // NotificationManager.success('Successfully edited...');
        } catch (error) {
            // NotificationManager.error(
            //     (client.isclientError(error) && error.message) || (error instanceof Error && error.message) || (error)
            // );
            throw error;
        }
    }
}
