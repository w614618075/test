import React, { useEffect, useState } from 'react'
import { useMount } from 'utils'

const test = () => {
    let num = 0
    const effect = () => {
        num += 1
        const message = `现在的num值：${num}`
        return function unmount(){
            console.log(message);
            
        }
    } 
    return effect
}

const add = test()  // 执行test,返回effect
const unmount = add() // 执行effect函数，返回引用了message1的unmount
add() // 再一次执行了effect函数，返回引用了message2的unmount
add() // message3
add() // message4
add() // message5
unmount() // 这里会打印什么呢？ 按照直觉似乎应该是打印3。但实际上
// react hook 与 闭包， hook 与 闭包经典的坑
export const Test = () => {
    const [num, setNum] = useState(0)

    const add = () => setNum(num + 1)

    useEffect(()=>{
       const id = setInterval(()=>{
            console.log("num in setInterval:",num);
        },1000)
        return () => clearInterval(id)
    },[num])

    useEffect(() => {
        return () => {
            console.log("卸载值：",num);
        }
    }, [num])
    return <div>
        <button onClick={add}>add</button>
        <p>
            number:{num}
        </p>
    </div>
}
