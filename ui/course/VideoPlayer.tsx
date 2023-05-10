// import React, { useRef, useState, useReducer, useCallback } from "react";
// import ReactPlayer from "react-player";
// import { Action, State, reducer } from "../../domain/courseReducer";

// const VideoPlayer = ({
//   url,
//   initialState,
// }: {
//   url: string;
//   initialState: State;
// }) => {
//   const [played, setPlayed] = useState<number>(0);
//   const playerRef = useRef(null);
//   const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
//     reducer,
//     initialState
//   );
//   const onEnded = useCallback(() => {
//     if (!state.isEnded) {
//       if (playerRef.current?.getDuration() === played) {
//         dispatch({ type: "setIsEnded", payload: true });
//         console.log(state.isEnded);
//       }
//     }
//   }, [played, state.isEnded]);

//   const onReady = useCallback(() => {
//     const videoDurations =
//       JSON.parse(window.localStorage.getItem("videoDurations") || "{}") || {};
//     if (JSON.stringify(videoDurations) !== "{}") {
//       let timestamp = videoDurations[playerRef.current?.props.url || ""];
//       if (timestamp > 0) {
//         playerRef.current?.seekTo(timestamp, "seconds");
//         playerRef.current?.play();
//       }
//     }
//     dispatch({ type: "setIsReady", payload: true });
//   }, []);

//   return (
//     <ReactPlayer
//       data-testid="actual-player"
//       ref={playerRef}
//       url={url}
//       width="100%"
//       onEnded={onEnded}
//       playing={state.isPlaying}
//       onReady={onReady}
//       muted={false}
//       controls={true}
//       onProgress={(progress) => {
//         setPlayed(progress.playedSeconds);
//         const videoDurations =
//           JSON.parse(window.localStorage.getItem("videoDurations") || "{}") ||
//           {};
//         videoDurations[url] = played;
//         window.localStorage.setItem(
//           "videoDurations",
//           JSON.stringify(videoDurations)
//         );
//       }}
//     />
//   );
// };

// export default VideoPlayer;
import React, { useRef, useState, useReducer, useCallback } from "react";
import ReactPlayer from "react-player";
import { Action, State, reducer } from "../../domain/courseReducer";
import {
  onEndedLogic,
  onReadyLogic,
  onProgressLogic,
} from "../../domain/videoLogic";

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
    dispatch(onEndedLogic(state, played, playerRef));
    //dispatch({ type: "setIsEnded", payload: true });
  }, [played, state]);

  const onReady = useCallback(() => {
    onReadyLogic(state, dispatch, playerRef);
  }, [state]);

  return (
    <ReactPlayer
      data-testid="actual-player"
      ref={playerRef}
      url={url}
      width="100%"
      onEnded={onEnded}
      playing={state.isPlaying}
      onReady={onReady}
      muted={false}
      controls={true}
      onProgress={(progress) =>
        onProgressLogic(url, progress.playedSeconds, setPlayed)
      }
    />
  );
};

export default VideoPlayer;
