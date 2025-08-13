import Image from "next/image"

export default function ButtonToggleMenu({state, setState}: {state: any, setState: any})
{
    const handler = () => {
        setState(!state)
    }

    return (
        <div className="flex items-center">
            <button onClick={handler} className="rounded-2xl hover:bg-black/20 w-4 h-4 bg-black/10 cursor-pointer">
            </button>
        </div>
    )
}