'use client'
import  ClipLoader  from "react-spinners/ClipLoader"
const Loading = () => {
    const override ={
        display:'block',
        margin: '100px auto'
    }

  return (
     <ClipLoader color="#FFC0CB" cssOverride={override} size={150} aria-label="loadind Spinner"/>
  )
}

export default Loading