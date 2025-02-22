import React from 'react'

function SkillCard({skill}) {
  return (
    <div className='flex justify-between items-center mt-5 backdrop-blur-xl shadow-xl p-3 border-2 rounded-lg border-gray-400 mr-2 '>
      <h3 className='font-bold text-white'>{skill?.skill}</h3>
      <progress className='progress-bar' max="100" value="50"/>  
    </div>
  )
}

export default SkillCard
