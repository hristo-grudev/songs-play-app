import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import * as songService from '../../services/songService';
import { SongContext } from "../../contexts/SongContext";

const EditSong = () => {
    const [currentSong, setCurrentSong] = useState({});
    const { songEdit } = useContext(SongContext);
    const { songId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        songService.getOne(songId)
            .then(songData => {
                setCurrentSong(songData);
            })
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        const songData = Object.fromEntries(new FormData(e.target));

        songService.edit(songId, songData)
            .then(result => {
                songEdit(songId, result);
                navigate(`/catalog/${songId}`)
            });
    };

    return (
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={onSubmit}>
                <div className="container">
                    <h1>Edit Song</h1>
                    <label htmlFor="leg-title">Song title:</label>
                    <input type="text" id="name" name="name" defaultValue={currentSong.name} />
                    <label htmlFor="style">Category:</label>
                    <input type="text" id="style" name="style" defaultValue={currentSong.style} />
                    <label htmlFor="lenght">Lenght:</label>
                    <input
                        type="number"
                        id="lenght"
                        name="lenght"
                        min={1}
                        defaultValue={currentSong.lenght}
                    />
                    <label htmlFor="song-img">Image:</label>
                    <input type="text" id="picture" name="picture" defaultValue={currentSong.picture} />
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" defaultValue={currentSong.description} />
                    <input className="btn submit" type="submit" defaultValue="Edit Song" />
                </div>
            </form>
        </section>
    );
}

export default EditSong;
