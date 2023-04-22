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
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
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
  const [summaryOptionsOpen, setSummaryOptionsOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(100);
  const categories = [
    "Entertainment",
    "Education",
    "Vlogs",
    "Product Reviews",
    "News/Current Events",
  ];

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

  function handleClick() {
    setSummaryOptionsOpen(!summaryOptionsOpen);
  }

  function handleSliderChange(event) {
    setSliderValue(event.target.value);
  }
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
    // TODO: no scrollbar
    // TODO: add filters
    // TODO: responsiveness
    setLoading(true);
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

  const emulateInputClick = () => {
    const inputElement = document.getElementById("youtube-link");
    inputElement.click();
  };
  // TODO: error handling if chatgpt returns error
  return (
    <>
      <div className="space-y-6">
        <section>
          <div className="py-8 px-4 max-w-screen-xl lg:py-16 lg:px-6">
            <div className="max-w-screen-lgsm:text-lg flex flex-col space-y-6">
              <h2 className="h1">YT-TRANSCRIBER</h2>
              <div className="flex items-center justify-center space-x-4">
                <img className="w-8" src={Youtube} alt={Youtube}></img>
                <img className="w-4" src={BlackCircle} alt={BlackCircle}></img>
                <img className="w-8" src={Openai} alt={Openai}></img>
                <img className="w-4" src={BlackCircle} alt={BlackCircle}></img>
                <img className="w-8" src={Clipboard} alt={Clipboard}></img>
              </div>
              <div>
                This Tool Transcribes and Summarizes Videos using OpenAi's
                Whisper and ChatGPT
              </div>
              <div className="flex items-center justify-center"></div>
              <div className="flex items-center justify-between">
                <div className="w-full space-y-4">
                  <div>
                    <label
                      htmlFor="youtube-link"
                      className="block mb-2 text-sm font-medium"
                    >
                      Youtube Link
                    </label>
                    <input
                      id="youtube-link"
                      type="text"
                      className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
                      placeholder="e.g. https://youtu.be/dQw4w9WgXcQ"
                      required
                      value={videoUrl}
                      onChange={handleVideoUrlChange}
                    ></input>
                  </div>
                  <div className="">
                    <div className="flex space-x-4 items-center justify-center">
                      <Button onClick={handleClick}>
                        {" "}
                        <div className="flex items-center justify-center space-x-4">
                          <div>Summary Options</div>

                          <FontAwesomeIcon
                            icon={
                              summaryOptionsOpen ? faChevronUp : faChevronDown
                            }
                          />
                        </div>
                      </Button>
                      <Button
                        disabled={videoUrl === ""}
                        onClick={
                          videoUrl === "" ? emulateInputClick : postVideoUrl
                        }
                      >
                        Go!
                      </Button>
                    </div>
                    {summaryOptionsOpen ? (
                      <div className="w-full flex flex-col md:flex-row space-y-4 p-4 items-center justify-evenly transition-all duration-200 border-2 border-gray-200 hover:bg-gray-200 rounded-md mt-4 py-4">
                        <div>
                          {/* TODO: Animations */}
                          <label htmlFor="range-slider">
                            Number Of Words: {sliderValue}
                          </label>
                          <input
                            type="range"
                            name="range-slider"
                            id="range-slider"
                            className="w-full"
                            min="100"
                            max="500"
                            step="100"
                            value={sliderValue}
                            onChange={handleSliderChange}
                          />
                        </div>

                        <div className="flex flex-col">
                          <label
                            className="flex space-x-4 items-center"
                            htmlFor="select"
                          >
                            <div>
                              {" "}
                              <input
                                type="checkbox"
                                id="my-checkbox"
                                name="interest1"
                                value="reading"
                              ></input>
                            </div>
                            <div>Video Type</div>
                          </label>
                          <select title="select">
                            {categories.map((category) => (
                              <option
                                key={category}
                                value={category
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}
                              >
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="h2">Gallery</h2>
          <div className="w-full block md:flex">
            <h3 className="h3 md:w-1/2">
              {primaryVideo.title ? (
                <Button>
                  <a
                    target="_blank"
                    className="flex space-x-4"
                    href={primaryVideo.url}
                  >
                    <img className="h-5" src={Youtube} alt={Youtube}></img>

                    <div>{primaryVideo.title}</div>
                  </a>
                </Button>
              ) : (
                ""
              )}
            </h3>
            <h3 className="h3 w-full md:w-1/2 flex items-center justify-between">
              <Button
                onClick={mode === "summary" ? toggleMode : void 0}
                disabled={mode === "transcript" ? true : false}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </Button>

              <div className="flex-grow text-center">
                <span>{mode === "transcript" ? "Transcript" : "Summary"}</span>
              </div>
              <Button
                onClick={mode === "transcript" ? toggleMode : void 0}
                disabled={mode === "summary" ? true : false}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </Button>
            </h3>
          </div>
          {/* TODO: loading animation */}
          {/* TODO: responsiveness */}
          {/* TODO: find better spot for copy button */}
          <div className="w-full flex flex-col md:flex-row rounded overflow-hidden shadow-lg md:h-[320px] p-4">
            <div className="hidden md:block relative h-0 md:w-1/2">
              <IFrame url={primaryVideo.url}></IFrame>
            </div>
            <div className="group relative px-6 py-4 md:w-1/2">
              <div>
                {/*h3 flex items-center justify-between*/}
                <div className="absolute right-0 hidden group-hover:flex transition-all duration-150">
                  <Button onClick={copyToClipboard}>
                    <div className="flex space-x-2 items-center">
                      <div>{copied ? "Copied!" : "Copy"}</div>
                      <FontAwesomeIcon icon={copied ? faCheck : faClipboard} />
                    </div>
                  </Button>
                </div>
                <div className="body max-h-[290px] hide-scrollbar overflow-y-scroll no-scrollbar">
                  <p id="content" className="py-4" ref={contentRef}>
                    {mode === "transcript"
                      ? primaryVideo.transcript
                      : primaryVideo.summary}
                  </p>
                </div>
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
