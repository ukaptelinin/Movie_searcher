import { MoviesListContext } from "@/entities/movies-list/model/context";
import { ErrorPage } from "@/shared/ErrorPage";
import { MoviesList } from "@/widgets/MoviesList";
import { FC, useContext } from "react";

export const MoviesListPage: FC =() =>{
    
    const { error } = useContext(MoviesListContext);
     return (<div className="w-full h-full ">{error ? <ErrorPage /> : <MoviesList />}</div>)}