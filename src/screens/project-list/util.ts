import { useMemo } from "react"
import { useUrlQueryParam } from "utils/url"

// 项目列表搜索的参数抽象成hook
export const useProjectsSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    // console.log(param,'param');
    return [
        useMemo(()=>({...param,personId:Number(param.personId) || undefined} ),[param]),
        setParam
    ] as const 
}