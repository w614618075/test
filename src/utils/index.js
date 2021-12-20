
export const isFalsy = (value) => value === 0 ? false : !value //排除value为0而不传值的情况，value为0也是有效的

// 在一个函数里，改变传入的对象本身的不好的。
export const cleanObject = (object) => {

    const result = { ...object } // = Object.assign({}, object)

    Object.keys(result).forEach(key => {

        const value = result[key]

        if (isFalsy(value)) {
            delete result[key]
        }
    })
    return result
}

