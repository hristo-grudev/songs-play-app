import { useContext } from 'react';

import { SongContext } from '../../contexts/SongContext';
import * as songService from '../../services/songService';

const CreateSong = () => {
    const { songAdd } = useContext(SongContext);

    const onSubmit = (e) => {
        e.preventDefault();

        const songData = Object.fromEntries(new FormData(e.target));

        songService.create(songData)
            .then(result => {
                songAdd(result)
            });
    };

    return (
        <section id="create-page" className="auth">
            <form id="create" onSubmit={onSubmit}>
                <div className="container">
                    <h1>Create Song</h1>
                    <label htmlFor="name">Song title:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter song title..."
                    />
                    <label htmlFor="style">Style:</label>
                    <input
                        type="text"
                        id="style"
                        name="style"
                        placeholder="Enter song style..."
                    />
                    <label htmlFor="length">Length:</label>
                    <input
                        type="number"
                        id="length"
                        name="length"
                        min={1}
                        placeholder={1}
                    />

                    <label htmlFor="picture">Image:</label>

                    <input
                        type="text"
                        id="picture"
                        name="picture"
                        placeholder="Upload a photo..."
                    />

                    <label htmlFor="description">Summary:</label>

                    <textarea name="description" id="description" defaultValue={""} />

                    <input
                        className="btn submit"
                        type="submit"
                        value="Create Song"
                    />
                </div>
            </form>
        </section>
    );
};

export default CreateSong;
