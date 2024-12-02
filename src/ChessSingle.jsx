import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';

export const ChessSingle = () => {
    const { chessId } = useParams();
    const [chess, setChess] = useState({});
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        const fetchData = async () => {
            try {
                const valasz = await axios.get(`https://chess.sulla.hu/chess/${chessId}`);
                setChess(valasz.data);
            } catch (hiba) {
                console.log(hiba);
            } finally {
                setPending(false);
            }
        };
        fetchData();
        }, [chessId]);

    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div>
                    <h2>Sakkozó {chess.name}</h2>
                    <div className="card col-sm-3 d-inline-block m-1 p-2">
                        <p className="text-dark">Sakkozó neve: {chess.name}</p>
                        <p className="text-dark">Születési éve: {chess.birth_date}</p>
                        <p className="text-dark">Megnyert világbajnokság: {chess.world_ch_won}</p>
                        <div>
                            <Link to={chess.profile_url}>Profil link</Link>
                            <br />
                            <img
                                src={chess.image_url ? chess.image_url : "https://via.placeholder.com/400x800"}
                                alt={chess.name}
                                className="img-fluid"
                                style={{ width: "200px" }}
                            />
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <Link to="/"><i class="bi bi-backspace-fill fs-3"></i></Link>&nbsp;&nbsp;&nbsp;
                            <Link to="/"><i class="bi bi-pencil-square fs-3" ></i></Link></div>
                    </div>
                </div>
            )}
        </div>
    );
}