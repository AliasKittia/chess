import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'; 
import axios from "axios";

export const ChesstList = () => {
    const [chesses, setChesses] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        axios.get('https://chess.sulla.hu/chess')
            .then(valasz => setChesses(valasz.data))
            .catch(hiba => console.log(hiba))
            .finally(() => setPending(false));
    }, []);

    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div>
                    <h2>Sakkozó</h2>
                    <div className="d-flex flex-wrap justify-content-center">
                        {chesses.map((chess, index) => (
                            <div className="card col-sm-3 m-1 p-2 d-flex flex-column align-items-center" key={index}>
                                 <p className="text-dark">Sakkozó neve: {chess.name}</p>
                                <p className="text-dark">Születési éve: {chess.birth_date}</p>
                                <p className="text-dark">Megnyert világbajnokság: {chess.world_ch_won}</p>
                                
                                <Link to={chess.profile_url} className="">Profil link</Link>
                                <Link to={`/chess/${chess.id}`}>
                                    
                                    <img
                                        src={chess.image_url ? chess.image_url : "https://via.placeholder.com/400x800"}
                                        alt={chess.name}
                                        className="img-fluid mb-2"
                                        style={{ width: "200px" }}
                                    />
                                </Link>
                               
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};