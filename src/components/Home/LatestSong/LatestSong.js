import { Link } from 'react-router-dom';

const LatestSong = ({
    song
}) => {
    return (
        <div className="song">
            <div className="image-wrap">
                <img src={song.picture} />
            </div>
            <h3>{song.name}</h3>
            <div className="rating">
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
            </div>
            <div className="data-buttons">
                <Link to={`/catalog/${song._id}`} className="btn details-btn" >
                    Details
                </Link>
            </div>
        </div>
    );
}; 

export default LatestSong;
