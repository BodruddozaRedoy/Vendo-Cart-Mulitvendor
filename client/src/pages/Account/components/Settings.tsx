import { Button } from "@/components/ui/button";

export default function Settings() {
  return (
    <div className='text-primary grid-cols-1 grid lg:grid-cols-2 gap-5 lg:gap-20'>
      {/* Contact Information + Shipping Address */}
      <div>
        <h1 className='font-semibold mb-5'>Contact Information</h1>
        <div className="space-y-3 mb-6">
          <input type="text" placeholder='Fullname *' className='py-3 px-5 shadow-md bg-background rounded-lg w-full' />
          <input type="text" placeholder='Username *' className='py-3 px-5 shadow-md bg-background rounded-lg w-full' />
          <input type="text" placeholder='Email *' className='py-3 px-5 shadow-md bg-background rounded-lg w-full' />
          <input type="text" placeholder='Phone Number *' className='py-3 px-5 shadow-md bg-background rounded-lg w-full' />
        </div>

        <h1 className='font-semibold mb-5'>Shipping Address</h1>
        <div className="space-y-3">
          <input type="text" placeholder='Street Address *' className='py-3 px-5 shadow-md bg-background rounded-lg w-full' />
          <input type="text" placeholder='City *' className='py-3 px-5 shadow-md bg-background rounded-lg w-full' />
          <input type="text" placeholder='State / Province *' className='py-3 px-5 shadow-md bg-background rounded-lg w-full' />
          <input type="text" placeholder='ZIP / Postal Code *' className='py-3 px-5 shadow-md bg-background rounded-lg w-full' />
          <input type="text" placeholder='Country *' className='py-3 px-5 shadow-md bg-background rounded-lg w-full' />
        </div>
        <Button className="mt-5" size={"lg"}>Save Changes</Button>
      </div>

      {/* Summary Info */}
      <div>
        <h1 className='text-3xl font-semibold mb-3'>Bodruddoza Redoy</h1>
        <h4 className='font-semibold'>Home Address:</h4>
        <p className='text-primary/50'>205 North Michigan Avenue, Suite 810 Chicago, 60601, USA</p>
        <h4 className='font-semibold'>Delivery Address:</h4>
        <p className='text-primary/50'>205 North Michigan Avenue, Suite 810 Chicago, 60601, USA</p>
        <h4 className='font-semibold'>Phone Number:</h4>
        <p className='text-primary/50'>(+01) 234 567 89 - (+01) 688 866 99</p>
      </div>
    </div>
  );
}
