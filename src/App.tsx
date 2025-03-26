import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home.tsx";
import Favorite from "./views/Favorite.tsx";
import NavBar from "./components/NavBar.tsx";
import { MovieProvider } from "./context/MovieContext.tsx";

function App() {
    return (
        <MovieProvider>
            <main className="main-route">
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/favorite" element={<Favorite />} />
                </Routes>
            </main>
        </MovieProvider>
    );
}

export default App;
