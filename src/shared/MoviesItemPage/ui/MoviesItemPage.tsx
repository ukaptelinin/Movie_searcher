import { FC } from "react";
import { useMoviesItemPage } from "../model/useMoviesItemPage";
import { ReturnButton } from "./ReturnButton";

 
 export const MoviesItemPage: FC = () => {
  const moviesItem = useMoviesItemPage();
  console.log(moviesItem.name);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-danger text-danger-foreground text-2xl font-bold p-4 rounded-lg">
      <ReturnButton/>
      <div className="mb-2">Фильм</div>
       <div>{moviesItem.name}</div>
    </div>
  );
};