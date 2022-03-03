import React, { useState } from 'react'

export default function DemoHookUseState() {

  let [state, setState] = useState({ like: 0 })

  const handleLike = () => {
    setState({
      like: state.like + 1
    })
  }
  return (
    <div className="container m-5">
      <div className="card text-left">
        <img style={{ height: 250, width: 250 }} className="card-img-top" src="https://gamek.mediacdn.vn/133514250583805952/2021/4/16/photo-1-1618559668420865160514.jpg" alt="pic" />
        <div className="card-body">
          <h4 className="card-title">Picture</h4>
          <p style={{ color: 'red' }}>{state.like}Tim</p>
        </div>
      </div>
      <button className="btn btn-danger" onClick={handleLike}>Like</button>
    </div>
  )
}
