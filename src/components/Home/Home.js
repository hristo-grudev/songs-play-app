
import LatestSong from "./LatestSong/LatestSong";

const Home = ({ songs }) => {
    return (
        <section id="welcome-world">
            <div className="welcome-message">
                <h2>ALL new songs are</h2>
                <h3>Only in SongsPlay</h3>
            </div>
            <img src="./images/music-plate.png" alt="hero" />
            <div id="home-page">
                <h1>Latest Songs</h1>

                {songs.length > 0
                    ? songs.map(x => <LatestSong key={x._id} song={x} />)
                    : <p className="no-articles">No songs yet</p>
                }
            </div>
        </section>
    );
}

export default Home;
