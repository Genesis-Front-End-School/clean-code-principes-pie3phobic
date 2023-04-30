import React, { useEffect, useRef, useReducer, RefObject } from "react";
import { FireIcon, StarIcon } from "@heroicons/react/solid";
import Header from "../components/Header";
import LessonCard from "../components/LessonCard";
import ApiClient from "./api/getCourseData";
import { reducer } from "../helpers/courseReducer";
import VideoPlayer from "../components/VideoPlayer";
import { handleUnlockedVideo, handleLockedVideo } from "../helpers/videoUtils";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import {
  CourseDataProps,
  LessonProps,
  PropsDataCourse,
} from "../helpers/types";
import { GetServerSidePropsContext } from "next";
const Course: React.FC<PropsDataCourse> = ({ data }) => {
  const lessonData = data.lessons;
  const initialState = {
    videoUrl: data.meta.courseVideoPreview?.link,
    nowPlaying: "Course Intro",
    lockedContent: false,
    isPlaying: true,
    isEnded: false,
    isReady: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const lessonRef = useRef();
  //const lessonRef: RefObject<LessonProps> = useRef();

  useEffect(() => {
    if (data.meta.courseVideoPreview?.link === void 0)
      dispatch({ type: "setLockedContent", payload: true });
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
              <VideoPlayer
                url={state.videoUrl}
                initialState={dispatch}
                width="100%"
                muted={false}
                controls={true}
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
                    handleUnlockedVideo(dispatch, lessonRef);
                  } else {
                    handleLockedVideo(dispatch);
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
};
export default Course;
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;
  const apiClient = await ApiClient.getInstance();
  const { data }: { data: CourseDataProps } = await apiClient.getCourseData(
    id as string
  );
  return { props: { data } };
};
