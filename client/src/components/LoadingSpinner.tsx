import React from 'react'
import ReactLoading from 'react-loading';

const LoadingSpinner: React.FC<{content: string}> = ({content}) => {
  return (
    <div className='flex flex-col justify-center items-center h-full gap-8 mt-12'>
        <ReactLoading type={'spinningBubbles'} color={'#5DA6FA'} height={'12%'} width={'12%'} />
        <p className='text-blue-400'>Preparing {content}...</p>
    </div>
  )
}

export default LoadingSpinner