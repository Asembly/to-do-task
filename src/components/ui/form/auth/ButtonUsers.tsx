import Image from "next/image";
import Link from "next/link";

export default function ButtonUsers()
{
    return(
        <div>
            <Link href={"/users"}>
                <button className="px-3 py-1 text-smcursor-pointer">
                    <Image width={20} height={20} alt="profile" src={"users.svg"}/>
                </button>
            </Link>
        </div>
    )
}