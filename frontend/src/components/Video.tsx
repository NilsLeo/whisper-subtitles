import React from 'react';

type Props = {
  video: any
}

const Video = ({ video }: Props) => {
  const videoId = video.url.replace('https://www.youtube.com/watch?v=', '').substring(0, 11);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg transition-all cursor-pointer scale-95 hover:scale-100 duration-150">
      <div className="relative h-0" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{video.title}</div>
        <p className="text-gray-700 text-base">{video.summary}</p>
      </div>
    </div>
  );
};

export default Video;
