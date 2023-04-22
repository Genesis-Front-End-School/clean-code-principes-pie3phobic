import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useReducer,
} from "react";
import { FireIcon, StarIcon } from "@heroicons/react/solid";
import ReactPlayer from "react-player";
import Header from "../components/Header";
import LessonCard from "../components/LessonCard";
import getCourseData from "./api/getCourseData";

function Course({ data }) {
  const lessonData = data.lessons;
  const [played, setPlayed] = useState(0);
  const initialState = {
    videoUrl: data.meta.courseVideoPreview?.link,
    nowPlaying: "Course Intro",
    lockedContent: false,
    isPlaying: true,
    isEnded: false,
    isReady: false,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "setVideoUrl":
        return { ...state, videoUrl: action.payload };
      case "setNowPlaying":
        return { ...state, nowPlaying: action.payload };
      case "setLockedContent":
        return { ...state, lockedContent: action.payload };
      case "setIsPlaying":
        return { ...state, isPlaying: action.payload };
      case "setIsEnded":
        if (lessonRef?.current) {
          lessonRef.current.style.backgroundColor = "red";
        }
        return { ...state, isEnded: action.payload };
      case "setIsReady":
        return { ...state, isReady: action.payload };
      default:
        throw new Error();
    }
  }

  const handleUnlockedVideo = () => {
    dispatch({ type: "setVideoUrl", payload: lessonRef.current.link });
    dispatch({ type: "setIsEnded", payload: false });
    dispatch({ type: "setLockedContent", payload: false });
  };

  const handleLockedVideo = () => {
    dispatch({ type: "setIsLocked", payload: true });
    dispatch({ type: "setIsEnded", payload: false });
    dispatch({ type: "setVideoUrl", payload: "" });
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const playerRef = useRef();
  const lessonRef = useRef();

  useEffect(() => {
    if (data.meta.courseVideoPreview?.link === void 0)
      dispatch({ type: "setLockedContent", payload: true });
  }, []);

  const onEnded = useCallback(() => {
    if (!state.isEnded) {
      playerRef.current.getDuration() === played;
      dispatch({ type: "setIsEnded", payload: true });
    }
  }, [state.isEnded, state.played]);

  const onReady = useCallback(() => {
    const videoDurations =
      JSON.parse(window.localStorage.getItem("videoDurations")) || {};
    if (JSON.stringify(videoDurations) !== "{}") {
      let timestamp = videoDurations[playerRef.current.props.url];
      if (timestamp > 0) {
        playerRef.current.seekTo(timestamp, "seconds");
        playerRef.current.play();
      }
    }
    dispatch({ type: "setIsReady", payload: true });
  }, []);

  return (
    <div>
      <Header />
      <div className="ml-10">
        <div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold pb-2">{data.title}</h1>
            <p className="pb-6 text-lg">{data.description}</p>
            <div className="pb-4">
              <a className="bg-red-400/80 px-2 py-1 rounded-3xl text-black/60">
                #{data.tags}
              </a>
              <div className="flex align-middle mt-2 mb-8">
                <FireIcon className="h-5 text-red-400" />
                <a className="text-red-400 text-sm font-semibold">
                  Launched on: {data.launchDate.split("T")[0]}
                </a>
              </div>
              <div className="flex">
                <StarIcon className="h-6 text-red-400" />
                <a className="font-bold">{data.rating}</a>
              </div>
              <div className="flex-grow">
                {[data.meta.skills]?.map((item) =>
                  item?.map((value, index) => (
                    <p key={`skill-${index}`} className="text-black/70">
                      {value}
                    </p>
                  ))
                )}
              </div>
              <p className="font-semibold pt-4 text-lg">
                Now Playing: {state.nowPlaying}
              </p>
              <div className="pt-4">
                {state.lockedContent === true && (
                  <a className="bg-red-400/80 px-24 py-1 rounded-3xl text-white">
                    This content is locked
                  </a>
                )}
                {state.isEnded === true && (
                  <a className="bg-green-400/80 px-24 py-1 rounded-3xl text-white">
                    Lesson finished ✔
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col  lg:flex-row lg:justify-between">
            <div className="pr-10 lg:pr-0">
              <ReactPlayer
                ref={playerRef}
                url={state.videoUrl}
                width="100%"
                onEnded={onEnded}
                playing={state.isPlaying}
                onReady={onReady}
                muted={false}
                controls={true}
                onProgress={(progress) => {
                  setPlayed(progress.playedSeconds);
                  const video_url = playerRef.current.props.url;
                  const videoDurations =
                    JSON.parse(window.localStorage.getItem("videoDurations")) ||
                    {};
                  videoDurations[video_url] = played;
                  window.localStorage.setItem(
                    "videoDurations",
                    JSON.stringify(videoDurations)
                  );
                }}
              />
            </div>
          </div>
          <div className="flex flex-col bg-gray-200 h-[560px] w-[310px] lg:w-[500px] overflow-scroll rounded-3xl lg:absolute pb-8 scrollbar-hide md:w-[686px] lg:top-80 lg:right-0">
            <p className="pl-10 pt-6 pb-4 text-xl font-semibold">Lessons:</p>
            {lessonData.map((lesson) => (
              <div
                key={lesson.id}
                ref={lessonRef}
                onClick={() => {
                  lessonRef.current = lesson;
                  dispatch({
                    type: "setNowPlaying",
                    payload: `Lesson ${lesson.order} '${lesson.title}'`,
                  });
                  if (lesson.status === "unlocked") {
                    handleUnlockedVideo();
                  } else {
                    handleLockedVideo();
                  }
                }}
              >
                <LessonCard key={lesson.id} {...lesson} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;
export async function getServerSideProps(context) {
  const { id } = context.query;
  const { data, accesData } = await getCourseData(id);

  return { props: { data, accesData } };
}
