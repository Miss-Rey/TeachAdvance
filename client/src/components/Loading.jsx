import React from 'react'
import { Spinner } from "flowbite-react";


const Loading = () => {
  return (
    <div className="flex flex-wrap items-center gap-2 justify-center h-screen bg-slate-500 bg-opacity-15 ">
        <Spinner aria-label="Extra large spinner example" size="xl" />
    </div>

  )
}

export default Loading