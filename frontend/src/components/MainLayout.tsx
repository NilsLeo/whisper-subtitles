import { useState, useRef } from "react";
import BlackCircle from "../assets/images/black-circle.png";
import Clipboard from "../assets/images/clipboard.png";
import Openai from "../assets/images/openai.png";
import Youtube from "../assets/images/youtube.png";
import Button from "./Button";
interface VideoData {
  url: string;
  title: string;
  transcript: string;
  summary: string;
}

const MainLayout = () => {

  const [summaryOptionsOpen, setSummaryOptionsOpen] = useState(false);

  const [videoUrl, setVideoUrl] = useState("");

  const [emptyVideo, setEmptyVideo] = useState<VideoData>({
    url: "",
    title: "",
    transcript: "",
    summary: "",
  });



  const handleVideoUrlChange = (e: any) => {
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

    const data = JSON.stringify({ url: videoUrl });
    const newVideo = {
      url: videoUrl,
      title: "",
      transcript: "",
      summary: "",
    };


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
.then((data) => {
  const newWindow = window.open()
  newWindow?.document.write(`<pre>${data.transcript}</pre>`)
})

      .catch((error) => {
        console.error(error);
        throw Error(error);
      });
  };


  const emulateInputClick = () => {
    const inputElement = document.getElementById("youtube-link");  };
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
                      <Button
                        disabled={videoUrl === ""}
                        onClick={
                          videoUrl === "" ? emulateInputClick : postVideoUrl
                        }
                      >
                        Go!
                      </Button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MainLayout;
