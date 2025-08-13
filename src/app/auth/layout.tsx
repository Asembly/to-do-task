import LayoutTask from "@/components/common/LayoutTask";
import { ReactElement } from "react";

export default function Layout({children}: {children: ReactElement}) {
  return (
    <html lang="en">
      <body>
        <LayoutTask>
            {children}
        </LayoutTask>
      </body>
    </html>
  );
}
