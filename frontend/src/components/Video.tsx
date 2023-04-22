import React from 'react';
import IFrame from './IFrame';

type Props = {
  video: any;
  onClick: () => void;
};
const Video = ({ video, onClick }: Props) => {

function getYouTubeID(url: string): string | undefined {
  if (!url) {
    return undefined;
  }
  const regEx =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/ as RegExp;
  const match: RegExpMatchArray | null = url.match(regEx);
  return match?.[1];
}

  const videoId = getYouTubeID(video.url);

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg transition-all cursor-pointer scale-95 hover:scale-100 duration-150"
      onClick={onClick}
    >
      <IFrame url={video.url}></IFrame>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{video.title}</div>
        {/* <p className="text-gray-700 text-base">{video.summary}</p> */}
      </div>
    </div>
  );
};

export default Video;
