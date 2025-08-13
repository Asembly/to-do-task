export default function InputField({name, type, value, setValue}: {value?: string, setValue?: any, name: string, type: string})
{
    return (
        <div>
            <input className="bg-black/10 p-2" value={value} onChange={(e) => setValue(e.target.value)} type={type} name={name} placeholder={name}/>
        </div>
    )
}