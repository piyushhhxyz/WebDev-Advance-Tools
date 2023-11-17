import sounddevice as sd
import numpy as np
from google.cloud import speech
from google.cloud.speech import enums
from google.cloud.speech import types

# Set up Google Cloud client
client = speech.SpeechClient()

# Callback function to process audio chunks
def audio_callback(indata, frames, time, status):
    volume_norm = np.linalg.norm(indata) * 10
    if volume_norm > 0.5:
        audio_data = indata.tobytes()

        audio = types.RecognitionAudio(content=audio_data)
        config = types.RecognitionConfig(
            encoding=enums.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=44100,
            language_code='en-US',
        )

        response = client.recognize(config=config, audio=audio)

        for result in response.results:
            print('Transcript: {}'.format(result.alternatives[0].transcript))

# Start recording from the microphone
with sd.InputStream(samplerate=44100, channels=2, dtype=np.int16, callback=audio_callback):
    print("Recording... Press Ctrl+C to stop.")
    sd.sleep(1000000)
