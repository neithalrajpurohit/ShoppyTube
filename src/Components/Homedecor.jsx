import React from "react";
import Header from "./Header";
import useCategories from "../CustomHooks/useCategories";
import CategoryCard from "./CategoryCard";

const Homedecor = () => {
  const [womenCategory, decorCategory] = useCategories();
  console.log(decorCategory);
  return (
    <div>
      <Header />
      <h1 className="text-[30px] text-center p-[30px]">Shop by Categories</h1>
      <div className="flex flex-wrap items-center max-w-[1200px] justify-center mx-auto gap-10">
        {decorCategory.map((decor) => {
          return (
            <CategoryCard
              key={decor.id}
              id={decor.id}
              title={decor.title}
              imageUrl={decor.imageUrl}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Homedecor;
