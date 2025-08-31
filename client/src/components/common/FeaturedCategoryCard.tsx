import type { ICategories } from '@/types'
import { IoMdArrowDropright } from 'react-icons/io'
import { Card, CardContent } from '../ui/card'

type categoriesProps = {
    category: ICategories
}

export default function FeaturedCategoryCard({ category }: categoriesProps) {
    return (
        <Card className='relative'>
            <CardContent className=' flex flex-col lg:flex-row rounded-lg'>
                <img className='w-20 object-contain m-auto lg:m-0' src={category.image} alt="" />
                <div>
                    <h1 className='font-semibold text-primary lg:w-3/4'>{category.name}</h1>
                    <div>
                        {
                            category?.subcategories?.map((sub, i) => (
                                <p key={i} className='flex gap-1 items-center text-sm lg:text-md text-primary font-light'><IoMdArrowDropright />{sub}</p>
                            ))
                        }
                    </div>
                </div>
                <button className='bg-primary py-1 px-3 text-background absolute top-0 right-0 rounded-tr-lg rounded-bl-lg cursor-pointer'>View all</button>
            </CardContent>
        </Card>
    )
}
