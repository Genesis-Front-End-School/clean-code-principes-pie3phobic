import React from "react";
import { LockClosedIcon } from "@heroicons/react/solid";

type LessonProps = {
  order: number;
  previewImageLink: string;
  status: string;
  title: string;
};

const LessonCard: React.FC<LessonProps> = (props) => {
  return (
    <div>
      <div className="flex rounded-2xl bg-white h-20 md:h-28 w-[250px] md:w-[400px] my-2 mx-auto cursor-pointer items-center active:bg-red-400">
        <img
          src={`${props.previewImageLink}/lesson-${props.order}.webp`}
          alt="Lesson preview image"
          className="hidden md:block rounded-2xl w-32 h-[75px] mx-4"
        />
        <p className="flex-grow ">
          {props.order}. {props.title}
        </p>
        {props.status === "locked" && (
          <LockClosedIcon className="h-6 pr-10 text-red-400" />
        )}
      </div>
    </div>
  );
};

export default LessonCard;
