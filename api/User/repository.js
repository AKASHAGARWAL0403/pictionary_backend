import { User } from "../../models/User"

export const findUserByName = async (name) => {
    return await User.findOne({where: {name: name}});
}

export const findUserById = async (id) => {
    return await User.findByPk(id);
}

export const createUser = async (name) => {
    return await User.create({
        name: name
    })
}