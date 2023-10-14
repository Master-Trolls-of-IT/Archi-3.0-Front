import axios from 'axios';
import {Dispatch, SetStateAction} from "react";
import {user} from "../user/user";
import Amplify, { Auth } from 'aws-amplify';

const useServicesData = (setUsers: Dispatch<SetStateAction<user[]>>): any => {
    const baseURL = ' https://zvqvejqbld.execute-api.eu-west-3.amazonaws.com/GaiaAlpha/'
    const baseHeaders = {
        'Content-Type': 'application/json'
    };
    const baseConfig = { baseURL: baseURL, headers: baseHeaders, withCredentials: false };

    const getAuthToken = async () => {
        const session = await Auth.currentSession(); // Obtenez la session actuelle
        return session.getIdToken().getJwtToken(); // Obtenez le jeton JWT
    }

    const getUsers = async () => {
        const authToken = await getAuthToken(); // Obtenez le jeton d'authentification
        try {
            const res = await axios.get(baseURL, { ...baseConfig, headers: { ...baseHeaders, Authorization: authToken } });
            const users = res.data;
            console.log(res.data);
            setUsers(users);
        } catch (error) {
            console.error(error);
        }
    }

    const createUser = (newUser: any) => {
        newUser.age = Number(newUser.age);

        axios.post(baseURL, newUser, baseConfig)
            .then(res => {
                const data = res.data;
                setUsers(data.users);
            })
    }

    const updateUser = (newUser: any) => {
        newUser.age = Number(newUser.age);

        axios.post(baseURL , newUser, baseConfig)
            .then(res => {
                const data = res.data;
                setUsers(data.users);
            })
    }

    const deleteUser = (userId: any) => {
        axios.delete(baseURL + userId )
            .then(res => {
                const data = res.data;
                setUsers(data.users);
            })
    }

    return { deleteUser, createUser, getUsers, updateUser };
}

export default useServicesData;
