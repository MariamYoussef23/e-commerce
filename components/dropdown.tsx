import React from 'react'
import { useAppDispatch } from 'redux/hooks'
import { updateCart} from '../redux/cartSlice'

type props = {
  values: string[] | number[]
  defaultValue?: string | number
  onChangeDropdown: (value: string) => void
}
function Dropdown({ values, defaultValue, onChangeDropdown }: props) {
  const dispatch = useAppDispatch()

  return (
    <select
      id="quantity"
      name="quantity"
      onChange={(e) => onChangeDropdown(e.target.value)}
      className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
    >
      {values.map((i: string | number) => {
        if (+i  === +defaultValue! ) {
          return <option key={Math.random()} value={i} selected>{i}</option>
        } else {
          return <option key={Math.random()} value={i}>{i}</option>
        }
      })}
    </select>
  )
}

export default Dropdown
