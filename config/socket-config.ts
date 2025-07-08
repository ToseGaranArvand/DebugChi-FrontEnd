import { io } from "socket.io-client";

export const socket = io(process.env.nodejs_server)

export const trend_socket = io(`${process.env.nodejs_server}/trend`)

export const comment_socket = io(`${process.env.nodejs_server}/comment`)

