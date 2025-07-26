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
                <h1 className='text-3xl font-bold text-primary'>{title}</h1>
                <p className='text-primary font-light'>{description}</p>
            </div>
        </div>
    )
}
