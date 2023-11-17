const openai = require('openai');
const recorder = require('node-record-lpcm16');
require('dotenv').config();

/**
 * Transcribe an audio buffer using OpenAI's API.
 *
 * @param {Buffer} audioBuffer - The audio buffer to transcribe.
 * @param {string} apiKey - The API key for authenticating with OpenAI.
 * @returns {Promise<Object>} - A promise that resolves with the transcription result.
 **/
async function transcribeAudioBuffer(audioBuffer, apiKey) {
    try {
        // Initialize the OpenAI client with the given API key.
        const openAiClient = new openai.OpenAI({ apiKey });
        
        // Send the audio buffer for transcription using the specified model.
        const transcription = await openAiClient.audio.transcriptions.create({
            file: audioBuffer,
            model: 'whisper-1'
        });
        
        // Return the transcription result.
        return transcription;
    } catch (error) {
        // Log any errors that occur during transcription.
        console.error('Error', error);
    }
}

// Start recording from the microphone.
const micStream = recorder.record({
    sampleRate: 16000,
    threshold: 0.5,
    verbose: false,
    recordProgram: 'rec',
    silence: '1.0'
});

micStream.stream().on('data', async (chunk) => {
    const transcription = await transcribeAudioBuffer(chunk, process.env.OPENAI_API_KEY);
    console.log(transcription.text);
}).on('error', (err) => {
    console.error('Recording error:', err);
});
