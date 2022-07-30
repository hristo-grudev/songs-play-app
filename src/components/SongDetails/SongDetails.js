import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import * as songService from '../../services/songService';

const SongDetails = ({
    addComment,
}) => {
    const { songId } = useParams();
    const [currentSong, setCurrentSong] = useState({});

    const [comment, setComment] = useState({
        username: '',
        comment: '',
    });

    const [error, setError] = useState({
        username: '',
        comment: '',
    });

    useEffect(() => {
        songService.getOne(songId)
            .then(result => {
                setCurrentSong(result);
            });
    })

    const addCommentHandler = (e) => {
        e.preventDefault();

        const result = `${comment.username}: ${comment.comment}`;

        addComment(songId, result);
    }

    const onChange = (e) => {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const validateUsername = (e) => {
        const username = e.target.value;
        let errorMessage = '';

        if (username.length < 4) {
          errorMessage = 'Username must be longer than 4 characters';
        } else if ( username.length > 10) {
            errorMessage = 'Username must be shorter than 10 characters';
        }

        setError(state => ({
            ...state,
            username: errorMessage,
        }));
    }

    return (
        <section id="song-details">
            <h1>Song Details</h1>
            <div className="info-section">
                <div className="song-header">
                    <img className="song-img" src={currentSong.picture} />
                    <h1>{currentSong.name}</h1>
                    <span className="levels">Length: {currentSong.length}</span>
                    <p className="type">{currentSong.style}</p>
                </div>
                <p className="text">
                    {currentSong.description}
                </p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {/* {song.comments?.map(x => 
                            <li className="comment">
                                <p>{x}</p>
                            </li>
                        )} */}
                    </ul>

                    {/* {!song.comments &&
                        <p className="no-comment">No comments.</p>
                    } */}
                </div>

                <div className="buttons">
                    <Link to={`/songs/${songId}/edit`} className="button">
                        Edit
                    </Link>
                    <Link to="#" className="button">
                        Delete
                    </Link>
                </div>
            </div>

            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                    <input
                        type="text"
                        name="username"
                        placeholder="John Doe"
                        onChange={onChange}
                        onBlur={validateUsername}
                        value={comment.username}
                    />

                    {error.username && 
                        <div style={{color: 'red'}}>{error.username}</div>
                    }

                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        onChange={onChange}
                        value={comment.comment}
                    />

                    <input
                        className="btn submit"
                        type="submit"
                        value="Add Comment"
                    />
                </form>
            </article>
        </section>
    );
};

export default SongDetails;
