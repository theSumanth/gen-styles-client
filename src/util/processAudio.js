import { resample } from 'wave-resampler';



const processAudio = async (arrayBuffer, audioContext) => {
    // Decode the incoming audio data into an audio buffer
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    // Get the audio data from the first channel (mono conversion)
    const inputSampleRate = audioBuffer.sampleRate;
    const inputData = audioBuffer.getChannelData(0); // Use first channel
    // Resample audio to 16 kHz
    const resampledData = resample(inputData, inputSampleRate, 16000);
    // Convert Float32Array to 16-bit PCM
    return floatToPCM(resampledData);
};
// Convert Float32Array to 16-bit PCM Uint8Array
const floatToPCM = (floatData) => {
    const pcmData = new Int16Array(floatData.length);
    for (let i = 0; i < floatData.length; i++) {
        pcmData[i] = Math.max(-32768, Math.min(32767, Math.round(floatData[i] * 32767)));
    }
    return new Uint8Array(pcmData.buffer); // Return PCM as Uint8Array
};

export default processAudio;