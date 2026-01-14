import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Lobby from "./screens/Lobby";
import Meeting from "./screens/Meeting";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby/:id" element={<Lobby />} />
        <Route path="/meeting/:id" element={<Meeting />} />
      </Routes>
    </BrowserRouter>
  );
}
