import { PiWarningCircle } from "react-icons/pi";

const ErrorComponent = () => {
  return (
    <div className="bg-gray-800 border border-red-500 rounded-md p-4 mb-4">
      <div className="flex items-center text-red-500 mb-2">
        <PiWarningCircle className="mr-2" />
        <span className="font-semibold">Unable to Generate Notes!</span>
      </div>
      <ul className="list-disc list-inside text-gray-400">
        <li>Check the url and try again.</li>
        <li>The video length must not exceed 40 minutes.</li>
        <li>Only English-language videos are supported.</li>
        <li>
          If the video is in another language, it should be no longer than 10
          minutes.
        </li>
      </ul>
    </div>
  );
};

export default ErrorComponent;
