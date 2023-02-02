import React from "react";
import useCategories from "../CustomHooks/useCategories";
import Header from "./Header";
import CategoryCard from "./CategoryCard";
const Women = () => {
  const [womenCategory, decorCategory] = useCategories();
  console.log(womenCategory);
  return (
    <div className="bg-[#BA6A71]">
      <Header />
      <h1 className="text-[30px] text-center p-[30px]">Shop by Categories</h1>
      <div className="flex flex-wrap items-center max-w-[1200px] justify-center mx-auto gap-10 bg-[#f2d1c9] rounded py-7 ">
        {womenCategory.map((women) => {
          return (
            <CategoryCard
              key={women.id}
              id={women.id}
              title={women.title}
              imageUrl={women.imageUrl}
            />
          );
        })}
      </div>
      Women
    </div>
  );
};

export default Women;
