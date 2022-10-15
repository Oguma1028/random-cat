import { useState } from "react";

interface CatCategory {
  id: number;
  name: string;
}

interface SearchedCatImage {
  breeds: string[];
  categories: CatCategory[];
  id: string;
  url: string;
  width: number;
  height: number;
}

type SearchedCatImageResponse = SearchedCatImage[];

const IndexPage = () => {
  const [catImageUrl, setCatImageUrl] = useState(
    "https://cdn2.thecatapi.com/images/bpc.jpg"
  );
  const catImages: string[] = [
    "https://cdn2.thecatapi.com/images/bpc.jpg",
    "https://cdn2.thecatapi.com/images/eac.jpg",
    "https://cdn2.thecatapi.com/images/6qi.jpg",
  ];

  const randomCatImage = (): string => {
    const index = Math.floor(Math.random() * catImages.length);
    return catImages[index];
  };

  const changeCatImage = () => {
    setCatImageUrl(randomCatImage());
  };

  const fetchImage = async (): Promise<SearchedCatImage> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const result = (await res.json()) as SearchedCatImageResponse;
    return result[0];
  };

  const handleClick = async () => {
    const image = await fetchImage();
    setCatImageUrl(image.url);
  };

  return (
    <>
      <button onClick={handleClick}>今日のねこ</button>
      <img src={catImageUrl} />
    </>
  );
};
export default IndexPage;
