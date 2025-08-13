'use client'
import ButtonTag from "./ButtonTag";
import ButtonToggleMenu from "./ButtonToggleMenu";

export default function ButtonTagList({tags, state, setState}: {tags: Tag[], state: any, setState: any})
{
    return (
        <div className="flex item-center space-x-2">
            {
                tags.map(item => (
                    <div key={item.id}>
                        <ButtonTag tag={item}/>
                    </div>
                ))
            }
            <ButtonToggleMenu state={state} setState={setState}/>
        </div>
    )
}