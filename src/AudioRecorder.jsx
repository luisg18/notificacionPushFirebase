import { useState, useRef } from "react";

const mimeType = "audio/webm";

export const AudioRecorder = () => {
	const [permission, setPermission] = useState(false);

	const mediaRecorder = useRef(null);

	const [recordingStatus, setRecordingStatus] = useState("inactive");

	const [stream, setStream] = useState(null);

	const [audio, setAudio] = useState(null);

	const [audioChunks, setAudioChunks] = useState([]);

	const getMicrophonePermission = async () => {
		if ("MediaRecorder" in window) {
			try {
				const mediaStream = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false,
				});
				setPermission(true);
				setStream(mediaStream);
			} catch (err) {
				alert(err.message);
			}
		} else {
			alert("The MediaRecorder API is not supported in your browser.");
		}
	};

	const startRecording = async () => {
		setRecordingStatus("recording");
		const media = new MediaRecorder(stream, { type: mimeType });

		mediaRecorder.current = media;

		mediaRecorder.current.start();

		let localAudioChunks = [];

		mediaRecorder.current.ondataavailable = (event) => {
			if (typeof event.data === "undefined") return;
			if (event.data.size === 0) return;
			localAudioChunks.push(event.data);
		};

		setAudioChunks(localAudioChunks);
	};

	const stopRecording = async () => {
		setRecordingStatus("inactive");
		mediaRecorder.current.stop();

		mediaRecorder.current.onstop = async () => 
    {
			const audioBlob = new Blob(audioChunks, { type: mimeType });
			const audioUrl = URL.createObjectURL(audioBlob);

			setAudio(audioUrl);

			setAudioChunks([]);

      setTimeout(async () => {
        await sendNotification(audioUrl);
      }, 2000);
		};
	};

  const sendNotification = async (audioUrl) => {
    const body = {
      to: "fccg69g9AYZjxMNCgS9iNQ:APA91bGmItnoMn9UJPN5VRU63DkKFydzDKjxf0bmjlo24BdakP9PcC6gHM7Wvrcv9-KoR-WdmgJZOwMJHrtXU-c4u104rH6Mkp4ayPrI__gEt0Hl_Mla10QC7x9LYMKKl51jD2Dv5uq1",
      notification: {
        title: "Nueva grabación",
        body: audioUrl
      }
    };
    const options = {
      method: "POST",
      headers: {
        "Authorization": "key=AAAA69BJ8HI:APA91bHbcZna3yIBXKprxqbjXSxRMfpaydV9ZJMquMD5c6N0p10A2mdw7hmEk7zK-IYOF1la1Vulz2XA2zAfD_vAveTOumPTrcxwudEXYpK12v27yFN2mUOE3BT1HpisPtsiQncIomNg",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    };
    const response = await fetch(
      "https://fcm.googleapis.com/fcm/send",
      options
    );
    console.log(response);
};

	return (
		<div>
			<h2>Audio Recorder</h2>
			<main>
				<div className="audio-controls">
					{!permission ? (
						<button onClick={getMicrophonePermission} type="button">
							Get Microphone
						</button>
					) : null}
					{permission && recordingStatus === "inactive" ? (
						<button onClick={startRecording} type="button">
							Start Recording
						</button>
					) : null}
					{recordingStatus === "recording" ? (
						<button onClick={stopRecording} type="button">
							Stop Recording
						</button>
					) : null}
				</div>
				{audio ? (
					<div className="audio-player">
						<audio src={audio} controls autoPlay loop></audio>
						<a download href={audio}>
							Download Recording
						</a>
					</div>
				) : null}
			</main>
		</div>
	);
};

export default AudioRecorder;