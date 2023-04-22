import React, { useState, useEffect, useRef } from "react";
import Video from "./Video";
import BlackCircle from "../assets/images/black-circle.png";
import Clipboard from "../assets/images/clipboard.png";
import Openai from "../assets/images/openai.png";
import Youtube from "../assets/images/youtube.png";
import ApiService from "../Api.service";
import IFrame from "./IFrame";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
interface VideoData {
  url: string;
  title: string;
  transcript: string;
  summary: string;
}

const MainLayout = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [primaryVideo, setPrimaryVideo] = useState<VideoData>({
    url: "",
    title: "",
    transcript: "",
    summary: "",
  });
  const [videoUrl, setVideoUrl] = useState("");

  const [emptyVideo, setEmptyVideo] = useState<VideoData>({
    url: "",
    title: "",
    transcript: "",
    summary: "",
  });
  const [mode, setMode] = useState<"transcript" | "summary">("transcript");
  const contentRef = useRef<HTMLDivElement>(null);

  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value);
    const newVideo = {
      url: e.target.value,
      title: "",
      transcript: "",
      summary: "",
    };
    setEmptyVideo(newVideo);
  };

  const postVideoUrl = async () => {
setLoading(true)
const data = JSON.stringify({ url: videoUrl });
    const newVideo = {
      url: videoUrl,
      title: "",
      transcript: "",
      summary: "",
    };
    
    setPrimaryVideo(newVideo);
    console.log("primary video", newVideo);
return fetch(`http://localhost:8000/api/videos/`, {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newVideo),
})
  .then((response) => response.json())
  .then((data) => setPrimaryVideo(data))
  .catch((error) => {
    console.error(error);
    throw Error(error);
  });
};

  const handleVideoClick = (video: VideoData) => {
    // Output video to the console when clicked
    console.log(video);
    setPrimaryVideo(video);
  };
  const loadVideos = async () => {
    try {
      const videoData = await ApiService.httpGet("/videos");
      setPrimaryVideo(videoData[0]);
      setVideos(videoData.slice(1, 13));
    } catch (err) {
      console.error("error fetching videos");
    }
  };
  const toggleMode = () => {
    setMode(mode === "transcript" ? "summary" : "transcript");
  };
  useEffect(() => {
    loadVideos();
  }, []);

  function getYouTubeID(url: string): string | undefined {
    if (!url) {
      return undefined;
    }
    const regEx =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/ as RegExp;
    const match: RegExpMatchArray | null = url.match(regEx);
    return match?.[1];
  }

  const copyToClipboard = () => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(contentRef.current as HTMLDivElement);
    selection?.removeAllRanges();
    selection?.addRange(range);
    document.execCommand("copy");
    selection?.removeAllRanges();
    setCopied(true);
  };

  return (
    <>
      <div className="space-y-6">
        <section>
          <div className="py-8 px-4 max-w-screen-xl lg:py-16 lg:px-6">
            <div className="max-w-screen-lg text-gray-500 sm:text-lg flex flex-col space-y-6">
              <h2 className="h1">YT-TRANSCRIBER</h2>
              <div className="flex items-center justify-center space-x-4">
                <img className="w-8" src={Youtube}></img>
                <img className="w-4" src={BlackCircle}></img>
                <img className="w-8" src={Openai}></img>
                <img className="w-4" src={BlackCircle}></img>
                <img className="w-8" src={Clipboard}></img>
              </div>
              <div>
                This Tool Transcribes and Summarizes Videos using OpenAi's
                Whisper and ChatGPT
              </div>
              <div className="flex items-center justify-center"></div>
              <div className="flex items-center justify-between">
                <div className="w-full">
                  <div>
                    <label
                      htmlFor="youtube-link"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First name
                    </label>
                    <input
                      id="youtube-link"
                      type="text"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="e.g. https://youtu.be/dQw4w9WgXcQ"
                      required
                      value={videoUrl}
                      onChange={handleVideoUrlChange}
                    ></input>
                  </div>
                  <button disabled={videoUrl===''} className="btn-primary" onClick={postVideoUrl}>
                    Transcribe!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="h2">Gallery</h2>
          <div className="w-full flex ">
            <h3 className="h3 w-1/2">{primaryVideo.title}</h3>
            <h3 className="h3 w-1/2 flex items-center justify-between">
              <FontAwesomeIcon
                className={
                  mode === "transcript"
                    ? "text-gray-500 text-opacity-25"
                    : "text-black cursor-pointer"
                }
                onClick={mode === "summary" ? toggleMode : void 0}
                icon={faChevronLeft}
              />
              <div className="flex-grow text-center">
                <span>{mode === "transcript" ? "Transcript" : "Summary"}</span>
              </div>
              <FontAwesomeIcon
                className={
                  mode === "summary"
                    ? "text-gray-500 text-opacity-25"
                    : "text-black cursor-pointer"
                }
                onClick={mode === "transcript" ? toggleMode : void 0}
                icon={faChevronRight}
              />
            </h3>
          </div>
          <div className="w-full flex rounded overflow-hidden shadow-lg h-[400px] p-4">
            <div className="relative h-0 w-1/2">
              <IFrame url={primaryVideo.url}></IFrame>
            </div>
            <div className="relative px-6 py-4 w-1/2">
              <div>
                {/* `h3 flex items-center justify-between `  */}

                <div className="flex items-end justify-end"></div>
                <button
                  className="flex items-center justify-end space-x-2 rounded-full border-gray-500 border-opacity-30 text-gray-500 border-2 py-1 px-2"
                  onClick={copyToClipboard}
                >
                  <span>{copied ? "Copied!" : "Copy"}</span>
                  <FontAwesomeIcon icon={copied ? faCheck : faClipboard} />
                </button>
                <p
                  id="content"
                  className="body max-h-[350px] hide-scrollbar overflow-y-scroll py-3"
                  ref={contentRef}
                >
                  <p></p>
                  {mode === "transcript"
                    ? primaryVideo.transcript
                    : primaryVideo.summary}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {videos.map((video, index) => (
              <Video
                key={index}
                video={video}
                onClick={() => handleVideoClick(video)}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default MainLayout;
