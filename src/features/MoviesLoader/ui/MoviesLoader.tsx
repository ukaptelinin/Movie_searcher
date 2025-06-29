import {CircularProgress} from "@heroui/progress";
import { FC } from "react";

export const MoviesLoader: FC = ( ) => 
  (
    <div className="absolute bottom-12 inset-0 bg-black/30 dark:bg-white/30 backdrop-blur-sm z-10 flex items-center justify-center">
      <CircularProgress aria-label="Loading..." size="lg" color="secondary"/>
    </div>
  );
