import React from 'react'

type Props = {
    title: string,
    description: string
}

export default function SectionTitle({title, description}:Props) {
    return (
        <div>
            {/* title  */}
            <div>
                <h1 className='text-2xl text-center lg:text-start lg:text-3xl font-bold text-primary'>{title}</h1>
                <p className='text-primary font-light text-center lg:text-start'>{description}</p>
            </div>
        </div>
    )
}
