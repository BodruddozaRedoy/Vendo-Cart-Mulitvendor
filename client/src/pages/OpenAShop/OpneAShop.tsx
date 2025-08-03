import { useState } from 'react';
import { useNavigate } from 'react-router';

const OpenAShop = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    address: '',
    contactMail: '',
    description: '',
    isVerified: false
  });
  const [logoPreview, setLogoPreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    logo: '',
    address: '',
    contactMail: ''
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleLogoUpload = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image type
      if (!file.type.match('image.*')) {
        setErrors({
          ...errors,
          logo: 'Please upload an image file'
        });
        return;
      }

      // Validate image size (under 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors({
          ...errors,
          logo: 'Image must be less than 2MB'
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        setFormData({
          ...formData,
          logo: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: !formData.name ? 'Shop name is required' : '',
      logo: !formData.logo ? 'Shop logo is required' : '',
      address: !formData.address ? 'Address is required' : '',
      contactMail: !formData.contactMail 
        ? 'Contact email is required' 
        : !/^\S+@\S+\.\S+$/.test(formData.contactMail)
          ? 'Please enter a valid email'
          : ''
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Here you would typically send the data to your backend
      // const response = await api.post('/vendors/register', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // On success, redirect to vendor dashboard
      navigate('/vendor/dashboard');
    } catch (err) {
      console.error('Registration failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Open Your Shop</h2>
            <p className="mt-2 text-gray-600">
              Register your vendor account to start selling on our platform
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Shop Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Shop Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Shop Logo */}
            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                Shop Logo *
              </label>
              <div className="mt-1 flex items-center">
                <div className="relative rounded-full overflow-hidden h-16 w-16 bg-gray-100">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Shop logo" className="h-full w-full object-cover" />
                  ) : (
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </div>
                <label
                  htmlFor="logo-upload"
                  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                >
                  Upload Logo
                  <input
                    id="logo-upload"
                    name="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="sr-only"
                  />
                </label>
              </div>
              {errors.logo && (
                <p className="mt-2 text-sm text-red-600">{errors.logo}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 2MB</p>
            </div>

            {/* Shop Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Shop Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.address ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.address && (
                <p className="mt-2 text-sm text-red-600">{errors.address}</p>
              )}
            </div>

            {/* Contact Email */}
            <div>
              <label htmlFor="contactMail" className="block text-sm font-medium text-gray-700">
                Contact Email *
              </label>
              <input
                type="email"
                id="contactMail"
                name="contactMail"
                value={formData.contactMail}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.contactMail ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.contactMail && (
                <p className="mt-2 text-sm text-red-600">{errors.contactMail}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Shop Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Tell customers about your shop..."
              />
            </div>

            {/* Verification Checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="isVerified"
                  name="isVerified"
                  type="checkbox"
                  checked={formData.isVerified}
                  onChange={(e) => setFormData({...formData, isVerified: e.target.checked})}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="isVerified" className="font-medium text-gray-700">
                  I verify that this information is accurate
                </label>
                <p className="text-gray-500">
                  Your shop will need to be approved by our team before going live
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitting ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Register Shop'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OpenAShop;