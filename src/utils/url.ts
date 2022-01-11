import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "utils"

// 返回页面url中，指定间的参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setsearchParams] = useSearchParams() // searchParams不能直接读取里边的值
    return [
        useMemo( // 这个Hook可以避免再每次渲染时都进行高开销的计算
            () => keys.reduce((prev, key) => {
                return { ...prev, [key]: searchParams.get(key) || '' } //加一个[]表示key是一个变量，而不是一个字符串属性
            }, {} as { [key in K]: string }),
            [searchParams]),
        // 第一个参数


        // 第二个参数
        (params: Partial<{ [key in K]: unknown }>) => {
            const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
            return setsearchParams(o)
        }
    ] as const
    //console.log(searchParams.get('name')); // 需 要通过get来读取里边的值
}
