import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useReducer,
} from "react";
import Header from "../components/Header";
import ReactPlayer from "react-player";
import LessonCard from "../components/LessonCard";
import { FireIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import getCourseData from "./api/getCourseData";
import Link from "next/link";

function Course({ data }) {
  const lessonData = data.lessons;
  const [videoUrl, setVideoUrl] = useState(data.meta.courseVideoPreview?.link);
  const [nowPlaying, setNowPlaying] = useState("Course Intro");
  const [lockedContent, setLockedContent] = useState(false);
  useEffect(() => {
    if (data.meta.courseVideoPreview?.link === void 0) setLockedContent(true);
  }, []);
  const [played, setPlayed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  const playerRef = useRef();
  const [isReady, setIsReady] = useState(false);
  const onEnded = useCallback(() => {
    if (!isEnded) {
      playerRef.current.getDuration() === played;
      setIsEnded(true);
    }
  }, [isEnded]);
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
    setIsReady(true);
  }, [isReady]);
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
                Now Playing: {nowPlaying}
              </p>
              <div className="pt-4">
                {lockedContent === true && (
                  <a className="bg-red-400/80 px-24 py-1 rounded-3xl text-white">
                    This content is locked
                  </a>
                )}
                {isEnded === true && (
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
                url={videoUrl}
                width="100%"
                onEnded={onEnded}
                playing={isPlaying}
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
                onClick={() => {
                  setNowPlaying(`Lesson ${lesson.order} '${lesson.title}'`);
                  if (lesson.status === "unlocked") {
                    setVideoUrl(lesson.link);
                    setIsEnded(false);
                    setLockedContent(false);
                  } else {
                    setLockedContent(true);
                    setIsEnded(false);
                    setVideoUrl("");
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