import React, { useEffect, useState } from 'react'
import ChildUseEffect from './ChildUseEffect'

export default function DemoHookUseEffect() {

  let [number, setNumber] = useState(1)
  let [like, setLike] = useState(1)

  //useEffect là hàm chạy sau khi giao diện render thay cho didmount và didupdate trong mọi trường hợp
  // useEffect(() => {
  //   console.log('didMount')
  //   console.log('didUpdate')
  // })

  //Cách viết thay thế componentDidMount     
  useEffect(() => {
    console.log('didMount')
  }, [])

  //Cách viết thay thế componentDidUpdate
  useEffect(() => {
    console.log('didUpdate khi number thay đổi')
    return () => {
      console.log('willUnmount')
    }
  }, [number]) //number là giá trị nếu bị thay đổi sau render thì useEffect này sẽ chạy
  console.log('render')

  const handleIncrease = () => {
    let newNumber = number + 1;
    setNumber(newNumber)
  }
  return (
    <div className="container m-5">
      <button onClick={() => {
        setLike(like + 1)
      }}>Like</button>
      <div className="card text-left">
        <img style={{ height: 250, width: 250 }} className="card-img-top" src="https://gamek.mediacdn.vn/133514250583805952/2021/4/16/photo-1-1618559668420865160514.jpg" alt="pic" />
        <div className="card-body">
          <h4 className="card-title">Picture</h4>
          <p style={{ color: 'red' }}>{number}Tim</p>
        </div>
      </div>
      <button className="btn btn-danger" onClick={handleIncrease}>Like</button>
      {/* {like === 1 ? <ChildUseEffect /> : ''} */}

    </div>
  )
}
