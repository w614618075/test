import { Select } from 'antd';
import React from 'react';
import { Raw } from 'types';


type SelectProps = React.ComponentProps<typeof Select> //拿到Select身上所有的属性

// interface IdSelectProps extends SelectProps 如果直接这样继承会出现报错，因为Select本身也有options这个属性，所以我们干脆直接再Select中去除我们自己定义的属性
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
    value: Raw | null | undefined
    onChange: (value: number | undefined) => void,
    defaultOptionName?: string // 默认值或者空值
    options?: { name: string, id: number }[]
}

// value 可以传入多种类型
// onChange 指挥回调 number | undefind 类型
// 当 isNaN(Number(value)) 为true的时候，代表选择默认类型。（当传入的值不能呗转换成number的时候，选择默认类型）
// 当选择默认类型的时候，onChange会回调undefind
export const IdSelect = (props: IdSelectProps) => {
    const { value, onChange, defaultOptionName, options, ...restProps } = props
    return <Select
        {...restProps}
        value={options?.length ? toNumber(value) : 0}
        onChange={value => onChange(toNumber(value) || undefined)}
    >
        {
            defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
        }
        {
            options?.map(option => <Select.Option value={option.id} key={option.id}>{option.name}</Select.Option>)
        }
    </Select>
}

const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)