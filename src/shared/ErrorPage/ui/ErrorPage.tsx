import { FC, useContext } from "react";

import { MoviesListContext } from "@/entities/movies-list/model/context";

export const ErrorPage:FC = () => {
    
const { error} = useContext(MoviesListContext);



   return (
<div className="w-full h-full flex items-center justify-center bg-danger text-danger-foreground text-2xl font-bold p-4 rounded-lg">
{error}
</div>
      );  
};
