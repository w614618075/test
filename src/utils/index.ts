import { useEffect, useRef, useState } from "react";
export const isFalsy = (value: unknown) => value === 0 ? false : !value //排除value为0而不传值的情况，value为0也是有效的
export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

// 在一个函数里，改变传入的对象本身的不好的。
export const cleanObject = (object: { [key: string]: unknown }) => {

    const result = { ...object } // = Object.assign({}, object)

    Object.keys(result).forEach(key => {

        const value = result[key]

        if (isVoid(value)) {
            delete result[key]
        }
    })
    return result
    // 0
};

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
        // TODO 依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export const useDebounce = <V>(value: V, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        // 每次在value/delay变化之后，设置一个定时器
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        // 每次在上一个useEffect处理完以后再运行
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debouncedValue
}

export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray)
    return {
        value,
        setValue,
        add: (item: T) => setValue([...value, item]),
        clear: () => setValue([]),
        removeIndex: (index: number) => {
            const copy = [...value]
            copy.splice(index, 1)
            setValue(copy)
        }
    }
}

// 动态切换文档标题
export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
    const oldTitle = useRef(document.title).current
    // 页面加载时：旧 title 'React App'
    // 加载后： 新title
    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        return () => {
            if (!keepOnUnmount) {
                // 如果不指定依赖，读到的就是旧title
                document.title = oldTitle
            }
        }
    }, [keepOnUnmount, oldTitle])
}

