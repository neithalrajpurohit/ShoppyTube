import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategories,
  getWomenBrands,
} from "../features/Category/CategorySlice";

const useCategories = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.data);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getWomenBrands());
  }, []);
  return [category.women, category.decor, category.brands];
};

export default useCategories;
