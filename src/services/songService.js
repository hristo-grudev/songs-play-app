import * as request from "./requester";

const baseUrl = 'https://baas.kinvey.com/appdata/kid_HyaxH-g6c/music';

export const getAll = () => request.get(baseUrl);

export const getOne = (songId) => request.get(`${baseUrl}/${songId}`);

export const create = (songData) => request.post(baseUrl, songData);

export const edit = (songId, songData) => request.put(`${baseUrl}/${songId}`, songData);
