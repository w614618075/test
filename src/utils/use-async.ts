import { useState } from "react"

interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = { // 我们自己给的默认的State
    stat: 'idle',
    data: null,
    error: null,
}

const defaultConfig = {
    throwOnError: false,
}
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {  //initialState用户自己传入的State，优先级比自己定义的要高
    const config = { ...defaultConfig, initialConfig }
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })

    // useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数。
    const [retry, setRetry] = useState(() => () => {

    })

    const setData = (data: D) => setState({
        data,
        stat: 'success',
        error: null,
    })

    const setError = (error: Error) => setState({
        error,
        stat: 'error',
        data: null,
    })

    // run 用来触发异步请求
    const run = (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => { //promise是一个容器
        if (!promise || !promise.then) { // 当promise不存在或者里边没有.then属性的时候
            throw new Error('请传入一个 Promise 类型数据') // throw new Error 会打断一切进程
        }
        setRetry(() => () => {
            if (runConfig?.retry) {
                run(runConfig?.retry(), runConfig)
            }
        })
        setState({ ...state, stat: 'loading' })
        return promise
            .then(data => { // 调用成功时
                setData(data)
                return data
            })
            .catch(error => {
                // catch会消化异常，如果不主动抛出外边是接受不到异常的
                setError(error)
                if (config.throwOnError) return Promise.reject(error)  // return error 是不行的
                return error
            })
    };


    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === "loading",
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        retry, // retry 呗调用时重新跑一遍run，让state刷新一遍
        ...state
    }
}

