import * as userRepository from "../repositories/user.repository";

export async function getAllUsers() {
    return userRepository.findAll();
}