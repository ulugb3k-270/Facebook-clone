// REACT || HOOKS
import React, { useCallback, useRef, useState } from "react";

function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startedDuration, setStartedDuration] = useState(0);

  const playPauseVideo = useCallback((e) => {
    setStartedDuration(e.target.duration);

    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, []);

  return (
    <div className="relative flex justify-center select-none max-h-[500px]">
      <video
        ref={videoRef}
        onPlay={useCallback(() => {
          setIsPlaying(true);
        }, [])}
        onPause={useCallback(() => {
          setIsPlaying(false);
        }, [])}
        src={src}
        height="450px"
        width="100%"
        onClick={playPauseVideo}
        className={`z-10 cursor-pointer`}
      />

      <div className="absolute flex flex-col items-center justify-center cursor-pointer w-full h-full overflow-hidden object-contain select-none ">
        <div
          style={{
            backgroundImage: `${
              !isPlaying
                ? "url(https://www.instagram.com/static/bundles/es6/sprite_video_2fdc79aa66b0.png/2fdc79aa66b0.png)"
                : ""
            }`,
          }}
          className={`mt-[-67px]  ml-[-67px] w-[135px] h-[135px]  block absolute top-[50%] left-[50%] ${
            isPlaying ? "" : "z-20"
          }`}
          onClick={playPauseVideo}
        ></div>

        <p className="absolute text-white font-semibold top-2 left-2 z-20">
          {startedDuration && (
            <>
              {Math.floor(startedDuration / 60)}
              {`:`}
              {Math.floor(startedDuration % 60)}
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default VideoPlayer;
