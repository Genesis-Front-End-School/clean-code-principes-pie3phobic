import React from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { CourseProps } from "../helpers/types";

const InfoCard: React.FC<CourseProps> = (props) => {
  return (
    <Link href={{ pathname: "/course", query: { id: props.id } }}>
      <div className="flex flex-col lg:flex-row py-4 lg:py-7 px-4 gap-10 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t last:border-t-0 ">
        <div className="relative w-[380px] h-[190px] lg:w-[380px] lg:h-[220px] md:w-full md:h-[300px] flex-shrink-0 self-center">
          <Image
            src={`${props.previewImageLink}/cover.webp`}
            alt="Course preview image"
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>
        <div className="flex flex-col flex-grow pl-5">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">{props.title}</p>
            <HeartIcon className="h-7 cursor-pointer" />
          </div>
          <h4 className="text-black/60 font-semibold">{props.description}</h4>
          <div className="border-b w-10 pt-2" />
          <p className="pt-2 text-sm text-red-400">
            Number of lessons: {props.lessonsCount}
          </p>
          <div className="flex-grow">
            {[props.meta.skills]?.map((item) =>
              item?.map((value, index) => (
                <p key={`skill-${index}`} className="text-black/70">
                  {value}
                </p>
              ))
            )}
          </div>
          <div className="flex items-end pt-5">
            <p className="flex items-center">
              <StarIcon className="h-5 text-red-400" />
              {props.rating}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InfoCard;
