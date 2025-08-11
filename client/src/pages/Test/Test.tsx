import React from 'react'

export default function Test() {
  return (
    <div className='card ring-offset-8 m-10'>
      <h1 className='title'>Card title</h1>
      <p>Card description</p>
      <button>Button</button>
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded
               focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50">
        Click Me
      </button>
    </div>
  )
}
