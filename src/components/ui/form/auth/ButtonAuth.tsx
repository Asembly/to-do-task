export default function ButtonAuth({text}: {text: string}){
    return(
        <div className="w-full">
            <button className="w-full bg-buttontask p-3 text-sm rounded-sm cursor-pointer text-white" type="submit">{text}</button>
        </div>
    )
}