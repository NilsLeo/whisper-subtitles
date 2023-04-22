import React from 'react'
type Props = {
  url: string;
};

const IFrame = ({ url }: Props) => {
  
  function getYouTubeID(url: string): string | undefined {
    if (!url) {
      return undefined;
    }
    const regEx =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/ as RegExp;
    const match: RegExpMatchArray | null = url.match(regEx);
    return match?.[1];
  }

  return (

          <div className="relative h-0" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${getYouTubeID(url)}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        </div>
  );
}

export default IFrame