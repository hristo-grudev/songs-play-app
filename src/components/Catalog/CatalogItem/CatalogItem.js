
import { Link } from 'react-router-dom';

const CatalogItem = ({ song }) => {
    return (
        <div className="allSongs">
            <div className="allSongs-info">
                <img src={song.picture} />
                <h6>{song.style}</h6>
                <h2>{song.name}</h2>

                <Link to={`/catalog/${song._id}`} className="details-button">
                    Details
                </Link>

                <Link style={{marginLeft: '150px'}} to={`/music/${song._id}/edit`} className="details-button">
                    Edit
                </Link>
            </div>

        </div>
    );
};

export default CatalogItem;
