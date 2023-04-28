// import React from "react";
// function MediumCard({ src, alt, text }) {
//   return (
//     <div className="bg-gray-200/80 p-8 pb-14 rounded-3xl hover:scale-105 transform transition duration-200 ease-out flex flex-col justify-center align-middle">
//       <img
//         src={src}
//         alt={alt}
//         className="rounded-3xl sm:w-[300px] md:w-[300px]"
//       />
//       <p className="font-semibold text-lg pt-4">{text}</p>
//     </div>
//   );
// }

// export default MediumCard;
import React from "react";

type MediumCardProps = {
  src: string;
  alt: string;
  text: string;
};

const MediumCard: React.FC<MediumCardProps> = ({ src, alt, text }) => {
  return (
    <div className="bg-gray-200/80 p-8 pb-14 rounded-3xl hover:scale-105 transform transition duration-200 ease-out flex flex-col justify-center align-middle">
      <img
        src={src}
        alt={alt}
        className="rounded-3xl sm:w-[300px] md:w-[300px]"
      />
      <p className="font-semibold text-lg pt-4">{text}</p>
    </div>
  );
};

export default MediumCard;
