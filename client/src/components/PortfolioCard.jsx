import React from 'react'

function PortfolioCard() {
  return (
    <div data-aos="flip-left" data-aos-easing="ease-out-cubic" className='px-5 lg:p-5 text-white w-[80vw] lg:w-[30vw] backdrop-blur-md border border-gray-500 select-none rounded-2xl my-20 lg:my-[200px] hover:scale-110 transition-all delay-100 hover:boder-white shadow-lg portfolioCard'>
        <h3 className='text-4xl lg:text-6xl font-bold py-3 border-2 border-transparent border-b-gray-400'>Portfolio*</h3>
        <h4 className='text-xl lg:text-2xl py-3 border-2 border-transparent border-b-gray-400'>Piyush Joshi</h4>
        <h1 className='text-xl lg:text-2xl py-3'>Fullstack Developer</h1>
        
    </div>
  )
}

export default PortfolioCard
