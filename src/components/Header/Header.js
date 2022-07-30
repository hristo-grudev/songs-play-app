import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

const Header = () => {
    const { user } = useContext(AuthContext);

    return (
        <header>
            <h1>
                <Link className="home" to="/">
                SongsPlay
                </Link>
            </h1>
            <nav>
                {user.email && <span>{user.email}</span>}
                <Link to="/catalog">All songs</Link>
                {user.email
                    ? <div id="user">
                        <Link to="/create">Create Song</Link>
                        <Link to="/logout">Logout</Link>
                    </div>
                    : <div id="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                }
            </nav>
        </header>
    );
};

export default Header;