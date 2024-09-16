import React from "react";
import { PiWarningCircle } from "react-icons/pi";

const ErrorComponent: React.FC = () => {
  return (
    <div className="bg-gray-800 border border-red-500 rounded-md p-4 mb-4 text-sm sm:text-base">
      <div className="flex items-center text-red-500 mb-2">
        <PiWarningCircle className="mr-2 flex-shrink-0" size={20} />
        <span className="font-semibold">Unable to Generate Notes!</span>
      </div>
      <ul className="list-disc list-inside text-gray-400 ml-6">
        <li className="mb-1">Check the URL and try again.</li>
        <li className="mb-1">The video length must not exceed 40 minutes.</li>
        <li className="mb-1">Only English-language videos are supported.</li>
        <li>
          If the video is in another language, it should be no longer than 10
          minutes.
        </li>
      </ul>
    </div>
  );
};

export default ErrorComponent;