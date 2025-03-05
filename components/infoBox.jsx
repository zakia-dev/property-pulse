"use client";
import Link from "next/link";

const InfoBox = ({
  heading,
  backgroundColor = "bg-gray-100",
  textcolor = "text-gray-900",
  children,
  buttoninfo = {},
}) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textcolor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textcolor} mt-2 mb-4`}>{children}</p>
      {buttoninfo.link ? (
        <Link
          href={buttoninfo.link}
          className={`${buttoninfo.backgroundColor || "bg-blue-500"} inline-block text-white rounded-lg px-4 py-2 hover:bg-pink-700`}
        >
          {buttoninfo.text || "Learn More"}
        </Link>
      ) : (
        <p className="text-red-500">Button link is missing!</p> // Fallback message
      )}
    </div>
  );
};

export default InfoBox;
