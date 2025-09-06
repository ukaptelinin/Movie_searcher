
import { MAIN_PATH } from "@/shared/const";
import { MoviesItemPage } from "@/shared/MoviesItemPage";
import { MoviesListPage } from "@/shared/MoviesListPage";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";



export const RootRoutes: FC = () => {

    return (
    <Routes>
        <Route path={MAIN_PATH} element={<MoviesListPage/>} />
        <Route path={`${MAIN_PATH}/movie/:id`} element={<MoviesItemPage />} />
    </Routes>)};