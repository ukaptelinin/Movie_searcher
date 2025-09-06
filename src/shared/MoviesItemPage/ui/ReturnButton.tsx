import { MAIN_PATH } from "@/shared/const";
import { Button } from "@heroui/button";
import {Link} from "@heroui/link";
import { FC } from "react";

export const  ReturnButton:FC =()=>(
    <Button
      showAnchorIcon
      as={Link}
      color="primary"
      href={MAIN_PATH}
      variant="solid"
    >
      Button Link
    </Button>
  );


