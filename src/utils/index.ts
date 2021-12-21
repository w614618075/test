import { useEffect, useState } from "react";
export const isFalsy = (value:unknown) => value === 0 ? false : !value //排除value为0而不传值的情况，value为0也是有效的

// 在一个函数里，改变传入的对象本身的不好的。
export const cleanObject = (object:object) => {

    const result = { ...object } // = Object.assign({}, object)

    Object.keys(result).forEach(key => {

        const value = result[key]

        if (isFalsy(value)) {
            delete result[key]
        }
    })
    return result
};

export const useMount = (callback:()=> void) => {
    useEffect(() => {
        callback()
    }, [])
}

export const useDebounce = <V>(value:V, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        // 每次在value/delay变化之后，设置一个定时器
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        // 每次在上一个useEffect处理完以后再运行
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debouncedValue
}
