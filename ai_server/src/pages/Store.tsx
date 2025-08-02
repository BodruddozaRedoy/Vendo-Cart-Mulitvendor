import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save, Upload, Globe, MapPin, Phone, Mail, Package, Users } from "lucide-react";

const Store = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Store Settings</h1>
            <p className="text-muted-foreground">
              Configure your store information and preferences
            </p>
          </div>
          <Button className="gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Store Information</CardTitle>
                <CardDescription>Basic details about your store</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input id="storeName" placeholder="Your Store Name" defaultValue="Tech Gadgets Store" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeUrl">Store URL</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        https://
                      </span>
                      <Input 
                        id="storeUrl" 
                        className="rounded-l-none" 
                        placeholder="yourstore.com" 
                        defaultValue="techgadgets.com"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Store Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your store..."
                    defaultValue="We sell the latest tech gadgets and accessories at competitive prices."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input id="phone" className="pl-10" placeholder="+1 (555) 123-4567" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input id="email" className="pl-10" placeholder="contact@yourstore.com" defaultValue="contact@techgadgets.com" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Store Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                    <Textarea 
                      id="address" 
                      className="pl-10"
                      placeholder="Enter your store address..."
                      defaultValue="123 Tech Street, Digital City, DC 12345"
                      rows={2}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Store Preferences</CardTitle>
                <CardDescription>Configure your store settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Store Status</Label>
                    <p className="text-sm text-muted-foreground">Make your store visible to customers</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Reviews</Label>
                    <p className="text-sm text-muted-foreground">Let customers leave product reviews</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Inventory Tracking</Label>
                    <p className="text-sm text-muted-foreground">Track product inventory automatically</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for new orders</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Store Logo</CardTitle>
                <CardDescription>Upload your store logo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="w-32 h-32 border-2 border-dashed border-muted rounded-lg flex items-center justify-center bg-muted/20">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Upload Logo</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Choose File
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Recommended size: 200x200px. Max file size: 2MB.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Store Stats</CardTitle>
                <CardDescription>Quick overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Store Active</p>
                    <p className="text-xs text-muted-foreground">Since Jan 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">456 Products</p>
                    <p className="text-xs text-muted-foreground">89 categories</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">2,345 Customers</p>
                    <p className="text-xs text-muted-foreground">89% active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Store;