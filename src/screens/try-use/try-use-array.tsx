import { useArray } from "../../utils/index";
import React from "react";

export const TsReactTest = () => {
    const persons: { name: string; age: string }[] = [
        { name: "jack", age: "25" },
        { name: "ma", age: "22" },
    ];
    const {value,clear,removeIndex,add} = useArray(persons);

    return(
        <div>
            <button onClick={()=>add({name:'join',age:"18"})}>add join</button>
            <button onClick={()=>removeIndex(0)}>remove 0</button>
            <button onClick={()=>clear()}>clear</button>
            {
                value.map((person,index)=>(
                    <div key={index}>
                        <span style={{color:"red"}}>{index}</span>
                        <span>{person.name}</span>
                        <span>{person.age}</span>
                    </div>
                ))
            }
        </div>
    )
}