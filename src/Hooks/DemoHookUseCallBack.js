import React, { useCallback, useState } from 'react'
import ChildUseCallBack from './ChildUseCallBack'

export default function DemoHookUseCallBack(props) {

  let [like, setLike] = useState(1)
  const renderNotify = () => {
    return `Bạn đã thả ${like} tim`
  }
  let callBackRenderNotify = useCallback(renderNotify, [])
  return (
    <div className="m-5">
      Like: {like} tim
      <br />
      <span style={{ cursor: 'pointer', color: 'red', fontSize: 35 }} onClick={() => {
        setLike(like + 1)
      }}>Tim</span>
      <br />
      <br />
      <ChildUseCallBack renderNotify={callBackRenderNotify} />
    </div>
  )
}
