import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ id, title, imageUrl }) => {
  const navigate = useNavigate();
  console.log(imageUrl);
  return (
    <div
      className="w-[300px] h-[400px] bg-white border cursor-pointer border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      onClick={() => navigate(`/product/${id}`)}>
      <div className="w-[300px] h-[300px]">
        <img className="rounded-t-lg w-full h-full " src={imageUrl} alt="" />
      </div>

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>

        {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p> */}
      </div>
    </div>
  );
};

export default CategoryCard;
