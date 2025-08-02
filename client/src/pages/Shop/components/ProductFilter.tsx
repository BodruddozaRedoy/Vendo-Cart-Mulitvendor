import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useState } from "react";

const brands = [
    "Samsung",
    "Sony",
    "LG",
    "Apple",
    "Panasonic"
];

export default function ProductFilter() {
    const [priceRange, setPriceRange] = useState<[number, number]>([20, 80]); // [min, max]

    return (
        <div className="text-primary rounded-lg shadow-md rounded-lg">
            <h1 className="font-semibold p-5">Product Filter</h1>
            <hr className="w-full border-t border-gray-200" />
            <div className="p-5 space-y-4">
                {/* Price Range Slider */}
                <h1 className="font-semibold">Price Range</h1>
                <Slider
                    defaultValue={priceRange}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    max={100}
                    min={0}
                    //   step={1}
                    minStepsBetweenThumbs={1}
                    className={`w-full`}
                />
                <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>

                {/* brand  */}
                <h1 className="font-semibold">Brands</h1>
                <div className="space-y-2">
                    {
                        brands?.map((brand, index) => (
                            <div className="flex items-center gap-3">
                                <Checkbox id={brand} />
                                <Label htmlFor={brand}>{brand}</Label>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}