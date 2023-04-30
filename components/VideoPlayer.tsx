import React, { useRef, useState, useReducer, useCallback } from "react";
import ReactPlayer from "react-player";
import { Action, State, reducer } from "../helpers/courseReducer";

const VideoPlayer = ({
  url,
  initialState,
}: {
  url: string;
  initialState: State;
}) => {
  const [played, setPlayed] = useState<number>(0);
  const playerRef = useRef(null);
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );
  const onEnded = useCallback(() => {
    if (!state.isEnded) {
      if (playerRef.current?.getDuration() === played) {
        dispatch({ type: "setIsEnded", payload: true });
        console.log(state.isEnded);
      }
    }
  }, [played, state.isEnded]);

  const onReady = useCallback(() => {
    const videoDurations =
      JSON.parse(window.localStorage.getItem("videoDurations") || "{}") || {};
    if (JSON.stringify(videoDurations) !== "{}") {
      let timestamp = videoDurations[playerRef.current?.props.url || ""];
      if (timestamp > 0) {
        playerRef.current?.seekTo(timestamp, "seconds");
        playerRef.current?.play();
      }
    }
    dispatch({ type: "setIsReady", payload: true });
  }, []);

  return (
    <ReactPlayer
      ref={playerRef}
      url={url}
      width="100%"
      onEnded={onEnded}
      playing={state.isPlaying}
      onReady={onReady}
      muted={false}
      controls={true}
      onProgress={(progress) => {
        setPlayed(progress.playedSeconds);
        const videoDurations =
          JSON.parse(window.localStorage.getItem("videoDurations") || "{}") ||
          {};
        videoDurations[url] = played;
        window.localStorage.setItem(
          "videoDurations",
          JSON.stringify(videoDurations)
        );
      }}
    />
  );
};

export default VideoPlayer;
