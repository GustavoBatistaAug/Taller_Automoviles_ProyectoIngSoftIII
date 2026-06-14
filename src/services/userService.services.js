const users = [];

export const fetchUsers = () => {
    return users;
}

export const addUser = (user) => {
    users.push(user);
    return user;
}

export const getUserById = (id) => {
    return users.find(user => user.id === id);
}

export const updateUser = (id, updatedUser) => {
    const index = users.findIndex(user => user.id === id);
    if(index !== -1){
        //TODO UPDATE USER
    }
}

export const deleteUser = (id) => {
    const index = users.findIndex(user => user.id === id);
    if(index !== -1){
        //TODO DELETE USER
    }
}

export default {
    getAllUsers: fetchUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser
}