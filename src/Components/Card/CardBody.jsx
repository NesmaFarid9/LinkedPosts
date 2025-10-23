import React from 'react'

export default function CardBody({ body, image }) {
    return <>
        {body && <p className='pb-3'>{body}</p>}
        {image && <img src={image} className='w-full h-75 object-cover' alt="post-image" />}


    </>
}
