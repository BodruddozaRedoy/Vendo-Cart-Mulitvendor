import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { categories } from "@/pages/Home/components/FeaturedCategories"
import type { ICategories } from "@/types"

export default function ProductCategories() {
    return (
        <div className="shadow-md rounded-lg">
            <h1 className="text-primary p-5 font-semibold">Product Categories</h1>
            <hr className='w-full' />
            <Accordion
                type="single"
                collapsible
                className="w-full p-5"
                defaultValue="item-1"
            >
                {
                    categories.map((cat: ICategories, index:number) => (
                        <AccordionItem key={index} value={`category-${index}`}>
                            <AccordionTrigger> <div className="flex items-center justify-between w-full"><p>{cat.name}</p> <div className="bg-muted p-1 rounded-lg">{cat?.subcategories?.length}</div></div></AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                {
                                    cat?.subcategories.map((sub, i) => (
                                        <p style={{listStyle: 'inside'}} className="cursor-pointer list-item" key={i}>
                                            {sub}
                                        </p>
                                    ))
                                }
                            </AccordionContent>
                        </AccordionItem>
                    ))
                }
            </Accordion>
        </div>
    )
}
