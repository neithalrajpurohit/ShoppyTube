import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <h1 className="flex justify-center font-serif text-4xl mb-4">
        Top Selling Products
      </h1>
      <div className="flex flex-col items-center space-y-4">
        <img
          src="https://sslimages.shoppersstop.com/sys-master/root/hd0/h8f/29099657560094/indianwear_Top-Banner-Web_ygsefugfyurajesh67.jpg"
          alt=""
          onClick={() =>
            navigate("/product/indianWear", {
              state: { type: "home", id: 4 },
            })
          }
        />
        <img
          src="https://sslimages.shoppersstop.com/sys-master/root/h7a/hf9/29099656577054/westernwear_Top-Banner-Web_dhavaluyjfy56.jpg"
          alt=""
          onClick={() =>
            navigate("/product/westernWear", {
              state: { type: "home", id: 5 },
            })
          }
        />
        <img
          src="https://sslimages.shoppersstop.com/sys-master/root/hb5/hc4/29100146032670/Categories-in-Spotlight-Strip-Web_spoyttbgfrr.gif"
          alt=""
          className="mb-4"
        />
      </div>
      <div className="flex flex-wrap justify-center">
        <img
          src="https://sslimages.shoppersstop.com/sys-master/root/h19/h8e/29099663228958/Suit-Sets-web_785754etrthfcs34rjjnn.jpg"
          alt=""
          onClick={() =>
            navigate("/product/suitsets", {
              state: { type: "title", query: "kashish" },
            })
          }
        />
        <img
          src="https://sslimages.shoppersstop.com/sys-master/root/hda/h8e/29099663294494/Kurtas-web_88gbbhu888hhbbhu8.jpg"
          alt=""
          onClick={() =>
            navigate("/product/kurtas", {
              state: { type: "title", query: "kurta" },
            })
          }
        />
        <img
          src="https://sslimages.shoppersstop.com/sys-master/root/he9/h94/29099663425566/Ethnic-wear-dress-web_9iijjnnjjnnjnji99ii9jjnn.jpg"
          alt=""
          onClick={() =>
            navigate("/product/ethnicdresses", {
              state: { type: "title", query: "ethnic" },
            })
          }
        />
        <img
          src="https://sslimages.shoppersstop.com/sys-master/root/ha9/h98/29099663556638/Tops-_-Tunic-web_5rdxxddr55rrddd.jpg"
          alt=""
          onClick={() =>
            navigate("/product/tops&tunics", {
              state: { type: "title", query: "tops" },
            })
          }
        />
        <img
          src="https://sslimages.shoppersstop.com/sys-master/root/h68/h9c/29099663687710/Best-Deals-4-Widgets-Jackets-_-Sweater-Web_7466uygfgf34y8734t843i7y7i.jpg"
          alt=""
          onClick={() =>
            navigate("/product/jackets", {
              state: { type: "title", query: "sweater" },
            })
          }
        />
        <img
          src="https://sslimages.shoppersstop.com/sys-master/root/h79/h9f/29099663753246/Best-Deals-4-Widgets-Dress-Web_ersetrtrtwa3222qw3qwaww3.jpg"
          alt=""
          onClick={() =>
            navigate("/product/dresses", {
              state: { type: "title", query: "dress" },
            })
          }
        />
        <img
          src="https://sslimages.shoppersstop.com/sys-master/root/ha0/ha6/29099663982622/Best-Deals-4-Widgets-Tops-_-Tees-Web_redrdfrdrdfdrdfrfdrffe45.jpg"
          alt=""
          onClick={() =>
            navigate("/product/tops", {
              state: { type: "title", query: "tees" },
            })
          }
        />
        <img
          src="https://sslimages.shoppersstop.com/sys-master/root/hc0/hfd/29099664539678/Best-Deals-4-Widgets-Smart-Watches-Web_arundhati66554.jpg"
          alt=""
          onClick={() =>
            navigate("/product/watches", {
              state: { type: "title", query: "watch" },
            })
          }
        />
        <img
          src="https://sslimages.shoppersstop.com/sys-master/root/hed/hf9/29099664670750/Best-Deals-4-Widgets-Shoes-Web_6yytdyrde456e6r6dxf56.jpg"
          alt=""
          onClick={() =>
            navigate("/product/shoes", {
              state: { type: "title", query: "shoe" },
            })
          }
        />
        <img
          src="https://sslimages.shoppersstop.com/sys-master/root/hef/hf6/29099664736286/Best-Deals-4-Widgets-Sandals-_-Flipflops-Web_sandalsvt67drythfhtc.jpg"
          alt=""
          onClick={() =>
            navigate("/product/sandals", {
              state: { type: "title", query: "sandal" },
            })
          }
        />
      </div>
    </div>
  );
};

export default Home;
