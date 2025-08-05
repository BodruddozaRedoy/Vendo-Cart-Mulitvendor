import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useGetProfile } from '@/hooks/useGetProfile';
import { useAddVendorMutation } from '@/redux/features/vendor/vendorApi';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';

const OpenAShop = () => {
  const { data: user } = useGetProfile();
  const [addVendor] = useAddVendorMutation();
  const navigate = useNavigate()
  // console.log(user.data)

  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    address: '',
    contactMail: '',
    phone: "",
    description: "",
    owner: user.data._id
  });
  console.log(formData)

  const [errors, setErrors] = useState({
    logo: '',
    contactMail: '',
  });

  useEffect(() => {
    setFormData({ ...formData, owner: user.data._id })
  }, [user])

  const isValidURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { logo: '', contactMail: '' };

    if (!isValidURL(formData.logo)) {
      newErrors.logo = 'Invalid logo URL';
    }

    if (!formData.contactMail.includes('@')) {
      newErrors.contactMail = 'Invalid email';
    }

    setErrors(newErrors);

    if (newErrors.logo || newErrors.contactMail) return;



    // const vendorPayload = {
    //   ...formData,
    //   owner: user.data._id,
    // };

    try {
      await addVendor(formData).unwrap();
      navigate("/vendor")
      toast.success("Vendor Registered")
      console.log('Vendor registered:', formData);
      // Optionally: reset form or show success message
    } catch (err) {
      console.error('Error registering vendor:', err);
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">Register New Vendor</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Vendor Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Logo URL */}
          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL</Label>
            <Input
              id="logo"
              placeholder="https://yourlogo.com/logo.png"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              required
            />
            {errors.logo && <p className="text-red-500 text-sm">{errors.logo}</p>}
            {formData.logo && isValidURL(formData.logo) && (
              <img
                src={formData.logo}
                alt="Logo Preview"
                className="w-24 h-24 object-cover rounded border"
              />
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Street, City, Country"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>



          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="address">Phone Number</Label>
            <Input
              id="phone"
              placeholder="+******"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          {/* Contact Email */}
          <div className="space-y-2">
            <Label htmlFor="contactMail">Contact Email</Label>
            <Input
              id="contactMail"
              type="email"
              placeholder="vendor@example.com"
              value={formData.contactMail}
              onChange={(e) => setFormData({ ...formData, contactMail: e.target.value })}
              required
            />
            {errors.contactMail && <p className="text-red-500 text-sm">{errors.contactMail}</p>}
          </div>
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="address">Description</Label>
            <Textarea
              id="description"
              placeholder="Type here..."
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full">
            Register Vendor
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OpenAShop;
