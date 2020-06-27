import { Room } from "../../models/Room"

export const findRoomByName = async (name) => {
    return await Room.findOne({where: {name: name}});
}

export const createRoom = async ({name, size, game_size, host_id}) => {
    return await Room.create({
        name: name,
        size: size,
        game_size: game_size,
        host_id: host_id
    })
}