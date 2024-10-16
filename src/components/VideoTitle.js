import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black '>
        <h1 className='text-6xl font-bold'>{title}</h1>
        <p className='py-6 text-lg w-1/3'>{overview}</p>
        <div className=''>
            <button className='bg-white hover:bg-opacity-50 duration-150 text-xl rounded-lg text-black px-12 p-4'>▶ Play</button>
            <button className='bg-gray-500 mx-2 text-xl bg-opacity-55 rounded-lg text-white px-12 p-4'>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle