import React, { useState, useEffect } from 'react'

export default function ChildUseEffect() {
  let [number, setNumber] = useState(1)

  console.log('render ChildUseEffect')
  useEffect(() => {
    //Viết cho didUpdate
    console.log('didUpdate')
    return () => {
      console.log('willUnmount')
    }
  }, [number])
  return (
    <div>
      <textarea></textarea> <br /> <br />
      <div className="btn btn-success">Gửi</div>
    </div>
  )
}
