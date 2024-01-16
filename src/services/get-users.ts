import axios from 'axios';
import {Dispatch, SetStateAction} from "react";
import {user} from "../user/user";

const useServicesData = (setUsers: Dispatch<SetStateAction<user[]>>): any => {
    const baseURL = 'https://yrs944tng9.execute-api.eu-west-3.amazonaws.com/GaiaAlpha/'
    const baseHeaders = {
        'Content-Type': 'application/json'
    };
    const baseConfig = { baseURL: baseURL, headers: baseHeaders, withCredentials: false };

    const getUsers = async () => {
        try {
            const res = await axios.get(baseURL, { ...baseConfig, headers: { ...baseHeaders, Authorization: "Wz3phJgpxAaWNo15v7FGP1IM4lly5znM7JcNYQAv" } });
            const users = res.data.body.users;
            console.log(res.data);
            setUsers(users ?? []);
        } catch (error) {
            console.error(error);
        }
    }

    const createUser = async (newUser: any) => {
        newUser.age = Number(newUser.age);
        try {
            const res = await axios.post(baseURL, newUser, { ...baseConfig, headers: { ...baseHeaders, Authorization: "Wz3phJgpxAaWNo15v7FGP1IM4lly5znM7JcNYQAv" } });
            const users = res.data.body.users;
            console.log(res.data);
            setUsers(users ?? []);
        } catch (error) {
            console.error(error);
        }

    }

    const updateUser = async (newUser: any) => {
        newUser.age = Number(newUser.age);
        try {
            const res = await axios.patch(baseURL, newUser, { ...baseConfig, headers: { ...baseHeaders, Authorization: "Wz3phJgpxAaWNo15v7FGP1IM4lly5znM7JcNYQAv" } });
            const users = res.data.body.users;
            console.log(res.data);
            setUsers(users ?? []);
        } catch (error) {
            console.error(error);
        }
    }

    const deleteUser = async (userId: any) => {
        try {
            const res = await axios.delete(baseURL + 'users/' + userId, { ...baseConfig, headers: { ...baseHeaders, Authorization: "Wz3phJgpxAaWNo15v7FGP1IM4lly5znM7JcNYQAv" } });
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
