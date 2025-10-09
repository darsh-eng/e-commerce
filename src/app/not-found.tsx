import Image from 'next/image'
import React from 'react'
import notfound from '../../public/images/404.jpg'

export default function Notfound() {
  return (
    <div>
        <Image src={notfound}  alt='not found' className='mx-auto bg-cover my-12'/>
    </div>
  )
}
