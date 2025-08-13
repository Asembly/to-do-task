import { ReactElement } from "react";

export default function LayoutTask({children} : {children: ReactElement})
{
    return(
        <div className="flex justify-center">
            {children}
        </div>
    ) 
}