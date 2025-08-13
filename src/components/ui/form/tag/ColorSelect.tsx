const colors = [
    "#E64CA9","#7CC455","#FFDBB1",
    "#E64C4C","#FFA63F","#B1E1FF",
    "#55C4BB","#EFFCFF","#A099FF",
] 

export default function ColorSelect({setColor}: {setColor: any})
{

    const handle = (color: string) =>{
        setColor(color)
    }

    return (
        <div className="flex max-w-27 flex-wrap space-y-1 space-x-1">
            {
                colors.map(item => (
                    <input onClick={() => handle(item)} type="button" name="color" className="size-8 rounded-sm hover:opacity-80 hover:border-2 cursor-pointer transition-opacity duration-300" style={{backgroundColor: item}}/>
                ))
            }
            
        </div>
    )
}