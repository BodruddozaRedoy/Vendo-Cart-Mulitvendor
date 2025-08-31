import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProfile } from "@/hooks/useGetProfile";
import { useUpdateUserMutation } from "@/redux/features/auth/authApi";
import type { IUser } from "@/types";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";

export default function Settings() {
  const { user } = useGetProfile();
  const [updateUser, result] = useUpdateUserMutation()

  // State for combined address string
  const [address, setAddress] = useState({
    delivery: "",
    home: ""
  });
  const [addressTab, setAddressTab] = useState("home")

  // State for user data
  const [userData, setUserData] = useState<Partial<IUser>>({
    fullName: "",
    email: "",
    bio: "",
    address,
    phone: "",
    picture: "",
  });

  // Separate state for shipping address parts
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  // When user changes, update userData and shippingAddress if available
  useEffect(() => {
    if (user) {
      setUserData(user);
      setAddress(user.address)
    }
  }, [user]);

  // Update shipping address and combined string
  const handleAddressChange = (field: keyof typeof shippingAddress, value: string) => {
    const updated = { ...shippingAddress, [field]: value };
    setShippingAddress(updated);
    const combined = Object.values(updated).filter(Boolean).join(", ");
    if (addressTab === "home") {
      setAddress({ ...address, home: combined });
    } else {
      setAddress({ ...address, delivery: combined });
    }
  };

  // console.log(addressTab)
  const handleUpdateUser = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const payload = {
      fullName: userData.fullName,
      bio: userData.bio,
      address,
      phone: userData.phone,
      picture: userData.picture,
    }
    await updateUser(payload)
    if(result.isSuccess){
      toast.success("User updated successfully")
    }
    if(result.error){
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="text-primary grid-cols-1 grid lg:grid-cols-2 gap-5 lg:gap-20">
      {/* Contact Information + Shipping Address */}
      <form onSubmit={handleUpdateUser}>
        <h1 className="font-semibold text-xl">Contact Information</h1>
        <hr className="my-5" />
        <div className="space-y-3 mb-6">
          <div>
            <label htmlFor="fullname" className="block mb-1 font-medium">
              Fullname *
            </label>
            <input
              value={userData.fullName || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUserData({ ...userData, fullName: e.target.value })
              }
              id="fullname"
              type="text"
              placeholder="Fullname *"
              className="py-3 px-5 shadow-md bg-background rounded-lg w-full"
            />
          </div>
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">
              Username *
            </label>
            {/* You might want a separate username state if it's different from fullName */}
            <input
              value={userData.fullName || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUserData({ ...userData, fullName: e.target.value })
              }
              id="username"
              type="text"
              placeholder="Username *"
              className="py-3 px-5 shadow-md bg-background rounded-lg w-full"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email *
            </label>
            <input
              disabled
              value={userData.email || ""}
              id="email"
              type="text"
              placeholder="Email *"
              className="py-3 px-5 shadow-md bg-background rounded-lg w-full"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1 font-medium">
              Phone Number
            </label>
            <input
              value={userData.phone || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUserData({ ...userData, phone: e.target.value })
              }
              id="phone"
              type="text"
              placeholder="Phone Number"
              className="py-3 px-5 shadow-md bg-background rounded-lg w-full"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block mb-1 font-medium">
              Bio
            </label>
            <textarea
              value={userData.bio || ""}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setUserData({ ...userData, bio: e.target.value })
              }
              id="bio"
              placeholder="Bio"
              className="py-3 px-5 shadow-md bg-background rounded-lg w-full"
            />
          </div>
        </div>

        <h1 className="font-semibold text-xl mb-5">Address</h1>
        <hr className="my-5" />


        <Tabs value={addressTab} className="w-full mb-5">
          <TabsList>
            <TabsTrigger onClick={() => setAddressTab("home")} value="home">Home</TabsTrigger>
            <TabsTrigger onClick={() => setAddressTab("delivery")} value="delivery">Delivery</TabsTrigger>
          </TabsList>
          <Separator className="my-5 w-full" />
          <TabsContent value="home">
            <div className="space-y-3">
              <div>
                <label htmlFor="street" className="block mb-1 font-medium">
                  Street Address *
                </label>
                <input
                  id="street"
                  value={shippingAddress.street}
                  onChange={(e) => handleAddressChange("street", e.target.value)}
                  type="text"
                  placeholder="Street Address *"
                  className="py-3 px-5 shadow-md bg-background rounded-lg w-full"
                />
              </div>
              <div>
                <label htmlFor="city" className="block mb-1 font-medium">
                  City *
                </label>
                <input
                  id="city"
                  value={shippingAddress.city}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                  type="text"
                  placeholder="City *"
                  className="py-3 px-5 shadow-md bg-background rounded-lg w-full"
                />
              </div>
              <div>
                <label htmlFor="state" className="block mb-1 font-medium">
                  State / Province *
                </label>
                <input
                  id="state"
                  value={shippingAddress.state}
                  onChange={(e) => handleAddressChange("state", e.target.value)}
                  type="text"
                  placeholder="State / Province *"
                  className="py-3 px-5 shadow-md bg-background rounded-lg w-full"
                />
              </div>
              <div>
                <label htmlFor="zip" className="block mb-1 font-medium">
                  ZIP / Postal Code *
                </label>
                <input
                  id="zip"
                  value={shippingAddress.zip}
                  onChange={(e) => handleAddressChange("zip", e.target.value)}
                  type="text"
                  placeholder="ZIP / Postal Code *"
                  className="py-3 px-5 shadow-md bg-background rounded-lg w-full"
                />
              </div>
              <div>
                <label htmlFor="country" className="block mb-1 font-medium">
                  Country *
                </label>
                <input
                  id="country"
                  value={shippingAddress.country}
                  onChange={(e) => handleAddressChange("country", e.target.value)}
                  type="text"
                  placeholder="Country *"
                  className="py-3 px-5 shadow-md bg-background rounded-lg w-full"
                />
              </div>
              <p className="mt-3 italic text-sm text-gray-600">Full Home Address: {address?.home}</p>
            </div>
          </TabsContent>
          <TabsContent value="delivery">
            <div className="space-y-3">
              <div>
                <label htmlFor="street" className="block mb-1 font-medium">
                  Street Address *
                </label>
                <input
                  id="street"
                  value={shippingAddress.street}
                  onChange={(e) => handleAddressChange("street", e.target.value)}
                  type="text"
                  placeholder="Street Address *"
                  className="py-3 px-5 shadow-md bg-background rounded-lg w-full"
                />
              </div>
              <div>
                <label htmlFor="city" className="block mb-1 font-medium">
                  City *
                </label>
                <input
                  id="city"
                  value={shippingAddress.city}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                  type="text"
                  placeholder="City *"
                  className="py-3 px-5 shadow-md bg-background rounded-lg w-full"
                />
              </div>
              <div>
                <label htmlFor="state" className="block mb-1 font-medium">
                  State / Province *
                </label>
                <input
                  id="state"
                  value={shippingAddress.state}
                  onChange={(e) => handleAddressChange("state", e.target.value)}
                  type="text"
                  placeholder="State / Province *"
                  className="py-3 px-5 shadow-md bg-background rounded-lg w-full"
                />
              </div>
              <div>
                <label htmlFor="zip" className="block mb-1 font-medium">
                  ZIP / Postal Code *
                </label>
                <input
                  id="zip"
                  value={shippingAddress.zip}
                  onChange={(e) => handleAddressChange("zip", e.target.value)}
                  type="text"
                  placeholder="ZIP / Postal Code *"
                  className="py-3 px-5 shadow-md bg-background rounded-lg w-full"
                />
              </div>
              <div>
                <label htmlFor="country" className="block mb-1 font-medium">
                  Country *
                </label>
                <input
                  id="country"
                  value={shippingAddress.country}
                  onChange={(e) => handleAddressChange("country", e.target.value)}
                  type="text"
                  placeholder="Country *"
                  className="py-3 px-5 shadow-md bg-background rounded-lg w-full"
                />
              </div>
              <p className="mt-3 italic text-sm text-gray-600">Full Deliver Address: {address?.delivery}</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* You can display combined address here if you want */}


        <Button type="submit" className="mt-5" size={"lg"}>
          {result.isLoading ? <Loading/> : "Save Changes"}
        </Button>
      </form>

      {/* Summary Info */}
      <div>
        <h1 className="text-3xl font-semibold mb-3">Bodruddoza Redoy</h1>
        <h4 className="font-semibold">Home Address:</h4>
        <p className="text-primary/50">{address?.home || "Not set"}</p>
        <h4 className="font-semibold">Delivery Address:</h4>
        <p className="text-primary/50">{address?.delivery || "Not set"}</p>
        <h4 className="font-semibold">Phone Number:</h4>
        <p className="text-primary/50">{userData.phone || "Not set"}</p>
        <h4 className="font-semibold">Bio:</h4>
        <p className="text-primary/50">{userData.bio || "Not set"}</p>
        <h4 className="font-semibold">Role:</h4>
        <p className="text-primary/50">{userData.role || "Not set"}</p>
      </div>
    </div>
  );
}
