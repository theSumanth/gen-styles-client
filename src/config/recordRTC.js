import RecordRTC from 'recordrtc';
import processAudio from '../util/processAudio';

const recordRTC = async (socketRef, mediaStreamRef) => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStreamRef.current = stream; 
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    return new RecordRTC(stream, {
    type: 'audio',
    mimeType: 'audio/wav',
    recorderType: RecordRTC.StereoAudioRecorder,
    timeSlice: 100, // Send audio data every 100ms
    ondataavailable: async (audioData) => {
            if (audioData.size > 0) {
                const buffer = await audioData.arrayBuffer();
                const processedBuffer = await processAudio(buffer, audioContext);
                socketRef.current.emit('audioData', processedBuffer);
            } else {
                console.warn("Empty audio data chunk received.");
            }
        },
    });
}

export default recordRTC;