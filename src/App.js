import { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';

import * as songService from './services/songService';
import { AuthContext } from './contexts/AuthContext';
import { SongContext } from './contexts/SongContext';

import Header from './components/Header/Header';
import Home from './components/Home';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import CreateSong from './components/CreateSong/CreateSong';
import EditSong from './components/EditSong/EditSong';
import Catalog from './components/Catalog/Catalog';
import SongDetails from "./components/SongDetails/SongDetails";
import './App.css';
import { useLocalStorage } from "./hooks/useLocalStorage";

const Register = lazy(() => import('./components/Register/Register'));

function App() {
    const [songs, setSongs] = useState([]);
    const [auth, setAuth] = useLocalStorage('auth', {});
    const navigate = useNavigate();

    const userLogin = (authData) => {
        setAuth(authData);
    };

    const userLogout = () => {
        setAuth({});
    };

    const addComment = (songId, comment) => {
        setSongs(state => {
            const song = state.find(x => x._id == songId);

            const comments = song.comments || [];
            comments.push(comment)

            return [
                ...state.filter(x => x._id !== songId),
                { ...song, comments },
            ];
        });
    };

    const songAdd = (songData) => {
        setSongs(state => [
            ...state,
            songData,
        ]);

        navigate('/catalog');
    };

    const songEdit = (songId, songData) => {
        setSongs(state => state.map(x => x._id === songId ? songData : x));
    }

    useEffect(() => {
        songService.getAll()
            .then(result => {
                setSongs(result);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
            <div id="box">
                <Header />

                {/* Main Content */}
                <SongContext.Provider value={{songs, songAdd, songEdit}}>
                    <main id="main-content">
                        <Routes>
                            <Route path="/" element={<Home songs={songs} />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={
                                <Suspense fallback={<span>Loading....</span>}>
                                    <Register />
                                </Suspense>
                            } />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/create" element={<CreateSong />} />
                            <Route path="/songs/:songId/edit" element={<EditSong />} />
                            <Route path="/catalog" element={<Catalog songs={songs} />} />
                            <Route path="/catalog/:songId" element={<SongDetails songs={songs} addComment={addComment} />} />
                        </Routes>
                    </main>
                </SongContext.Provider>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
