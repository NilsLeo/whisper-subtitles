import React, { useState, useEffect } from "react";
import Video from "./Video";
import StepTabs from "./StepTabs";

interface VideoData {
  url: string;
}

const MainLayout = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/videos", {
        });
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const videoComponents = videos.map((video, index) => (
    <Video key={index} video={video} />
  ));

  console.log(videos);
  return (
    <>
      <section>
        <div className="py-8 px-4 max-w-screen-xl lg:py-16 lg:px-6">
          <div className="max-w-screen-lg text-gray-500 sm:text-lg">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Paste Link in order to Start Conversion
            </h2>

          </div>
          <div className="flex items-center justify-between">
<StepTabs></StepTabs>


<iframe width="560" height="315" src="https://www.youtube.com/embed/PNtFSVU-YTI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


</div>
        </div>
      </section>
      <div>Gallery</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {videoComponents}
      </div>
    </>
  );
};

export default MainLayout;
