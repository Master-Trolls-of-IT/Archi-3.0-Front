import axios from 'axios';
import {Dispatch, SetStateAction} from "react";
import {user} from "../user/user";
import Amplify, { Auth } from 'aws-amplify';

const useServicesData = (setUsers: Dispatch<SetStateAction<user[]>>): any => {
    const baseURL = 'https://zvqvejqbld.execute-api.eu-west-3.amazonaws.com/GaiaAlpha/'
    const baseHeaders = {
        'Content-Type': 'application/json'
    };
    const baseConfig = { baseURL: baseURL, headers: baseHeaders, withCredentials: false };

    const getAuthToken = async () => {
        const session = await Auth.currentSession(); // Obtenez la session actuelle
        return session.getIdToken().getJwtToken(); // Obtenez le jeton JWT
    }

    const getUsers = async () => {
        const authToken = await getAuthToken();
        try {
            const res = await axios.get(baseURL, { ...baseConfig, headers: { ...baseHeaders, Authorization: authToken } });
            const users = res.data.body.users;
            console.log(res.data);
            setUsers(users ?? []);
        } catch (error) {
            console.error(error);
        }
    }

    const createUser = async (newUser: any) => {
        const authToken = await getAuthToken();
        newUser.age = Number(newUser.age);
        try {
            const res = await axios.post(baseURL, newUser, { ...baseConfig, headers: { ...baseHeaders, Authorization: authToken } });
            const users = res.data.body.users;
            console.log(res.data);
            setUsers(users ?? []);
        } catch (error) {
            console.error(error);
        }

    }

    const updateUser = async (newUser: any) => {
        const authToken = await getAuthToken();
        newUser.age = Number(newUser.age);
        try {
            const res = await axios.patch(baseURL, newUser, { ...baseConfig, headers: { ...baseHeaders, Authorization: authToken } });
            const users = res.data.body.users;
            console.log(res.data);
            setUsers(users ?? []);
        } catch (error) {
            console.error(error);
        }
    }

    const deleteUser = async (userId: any) => {
        const authToken = await getAuthToken();
        try {
            const res = await axios.delete(baseURL + 'users/' + userId, { ...baseConfig, headers: { ...baseHeaders, Authorization: authToken } });
            console.log(res)
            const users = res.data.body.users;
            console.log(res.data);
            setUsers(users ?? []);
        } catch (error) {
            console.error(error);
            await getUsers()
        }
    }

    return { deleteUser, createUser, getUsers, updateUser };
}

export default useServicesData;
