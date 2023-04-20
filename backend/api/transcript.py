import os
# import whisper
import openai
from yt_dlp import YoutubeDL
# import tiktoken

def download_video_and_convert_to_mp3(url):
    URLS = [url]
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'outtmpl': r'output.%(ext)s'
    }
    with YoutubeDL(ydl_opts) as ydl:
        ydl.download(URLS)

def delete_mp3():
    if os.path.exists("output.mp3"):
        os.remove("output.mp3")

def create_transcript():
    media_file = open("output.mp3", 'rb')
    return openai.Audio.transcribe(api_key = os.environ["OPENAI_API_KEY"], model='whisper-1', file=media_file, response_format='srt')       

def create_summary(transcript):
    messages = []
    message = "'The following is a transcript of an informative youtube Video. Turn it into a guide/ documentation of all the important information that i can reference in the future. The documentation should have roughly 10% as many words as the input. For example if the transcript is 300 words long, i want it summarized in about 30 words. In addition, i want you to use bullet points, headings, and anything else which improves the structure, conciseness and readability of the documentation.The Result should be written in the same language detected in the transcript.The Result should be outputted in a markdown: \n \n `'" + transcript + "`"
    print(message)
    messages.append({"role": "user", "content": message})
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages)
    reply = response["choices"][0]["message"]["content"]
    messages.append({"role": "assistant", "content": reply})
    return reply

# def num_tokens_from_string(string: str, encoding_name: str) -> int:
#     """Returns the number of tokens in a text string."""
#     encoding = tiktoken.get_encoding(encoding_name)
#     num_tokens = len(encoding.encode(string))
#     return num_tokens

# def split_transcript_into_array_by_no_of_tokens(transcript, max_tokens_per_chunk):
#     transcript_tokens = transcript.split(" ")
#     chunks = []
#     chunk = ""
#     chunk_token_count = 0
#     for token in transcript_tokens:
#         if chunk_token_count + len(token) + 1 <= max_tokens_per_chunk:
#             chunk += token + " "
#             chunk_token_count += len(token) + 1
#         else:
#             chunks.append(chunk.strip())
#             chunk = token + " "
#             chunk_token_count = len(token) + 1
#     if chunk:
#         chunks.append(chunk.strip())
#     return chunks