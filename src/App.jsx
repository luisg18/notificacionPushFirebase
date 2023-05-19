import './App.css';
import {getAuth, signInAnonymously} from "firebase/auth";
import {getToken, onMessage} from "firebase/messaging";
import {messaging} from "./firebase";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import React from "react";
import {AudioRecorder} from './AudioRecorder';
import {VideoRecorder} from './VideoRecorder';

export const App = () => {
    let [recordOption, setRecordOption] = useState("video");
    const toggleRecordOption = (type) => {
        return () => {
            setRecordOption(type);
        };
    };

    const loguearse = () =>{
        signInAnonymously(getAuth()).then(usuario => console.log(usuario))
    }

    const activarMensajes = async () =>{
        const token = await getToken(messaging, {
            vapidKey: "BLv0rJ-Lcdd0Hz2fq-T2YMMtjaTtiDOfl-fBFyLQgM-i40ZwLrjDIzX0dbP1dRJ2jgM21tTy-AbSzV4LowW41fY"
        }).catch(error => console.log("Error al generar el token",error));

        if (token) 
            console.log(token);
        else
            console.log("No hay token");
        
    }

    React.useEffect(() => {
        onMessage(messaging, message => {
            console.log("tu mensaje", message);
            const audio = message.notification.body;
            console.log("audio: ",audio);
            toast(message.notification.title);
        } )
    }, []);

    return (
        <div>
			<h1>React Media Recorder</h1>
			<div className="button-flex">
				<button onClick={toggleRecordOption("video")}>Record Video</button>
				<button onClick={toggleRecordOption("audio")}>Record Audio</button>
			</div>
			<div>
				{recordOption === "video" ? <VideoRecorder /> : <AudioRecorder />}
			</div>
            <div>
                <ToastContainer/>
                <button onClick={loguearse}>Loguearse</button>
                <button onClick={activarMensajes}>Recibir notificaciones</button>
            </div>
		</div>
    );
};
