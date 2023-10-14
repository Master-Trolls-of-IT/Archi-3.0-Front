import {useState} from "react";
import useEffectOnce from "./utils/use-effect-once";
import useServicesData from "./services/get-users";

const useAppData = () => {
    const [users, setUsers] = useState([
        {
            id: 1,
            username: 'Utilisateur1',
            lastname: 'Nom1',
            firstname: 'Prénom1',
            age: '30'
        }
    ]);

    const { createUser, getUsers, updateUser, deleteUser } = useServicesData(setUsers);

    useEffectOnce(() => {
        getUsers(setUsers);
    });

    const [editingUser, setEditingUser] = useState(-1);
    const [newUser, setNewUser] = useState({
        username: '',
        lastname: '',
        firstname: '',
        age: '',
        status: 'true',
    });

    const handleEditUser = (userId: number) => {
        setEditingUser(userId);
    };

    const handleEditUserChange = (userId: number, key: any, value: any) => {
        const updatedUsers = users.map((user) => {
            if (user.id === userId) {
                return { ...user, [key]: value };
            }
            return user;
        });
        setUsers(updatedUsers);
    };

    const handleSaveUser = (userId: number) => {
        setEditingUser(-1);

        users.map((user) => {
            if (user.id === userId) {
                updateUser(user);
                return;
            }
            return;
        });
    };

    const handleDeleteUser = (userId: number) => {
        deleteUser(userId);
    };

    const handleCreateUser = () => {
        createUser({
            id: users.length + 1,
            username: newUser.username,
            lastname: newUser.lastname,
            firstname: newUser.firstname,
            age: Number(newUser.age),
            rights: 0,
            status: newUser.status === 'actif' || newUser.status === 'true' ? 'actif' : 'non actif'
        });
        setNewUser({
            username: '',
            lastname: '',
            firstname: '',
            age: '',
            status: 'true',
        });
    };

    return { users, handleDeleteUser, handleCreateUser, handleSaveUser, handleEditUser, handleEditUserChange, editingUser, newUser, setNewUser }
}

export default useAppData;
