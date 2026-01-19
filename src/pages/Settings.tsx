import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Users,
  Shield,
  Palette,
  Bell,
  CreditCard,
  FileText,
  Upload,
} from "lucide-react";

const Settings = () => {
  return (
    <DashboardLayout
      title="Settings"
      description="Manage your shop settings and preferences"
    >
      <Tabs defaultValue="organization" className="space-y-6">
        <TabsList className="bg-secondary p-1">
          <TabsTrigger value="organization" className="gap-2">
            <Building2 className="h-4 w-4" />
            Organization
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Users & Roles
          </TabsTrigger>
          <TabsTrigger value="financial" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Financial
          </TabsTrigger>
          <TabsTrigger value="templates" className="gap-2">
            <FileText className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Organization Settings */}
        <TabsContent value="organization">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">Shop Information</CardTitle>
                <CardDescription>
                  Basic details about your business
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shopName">Shop Name</Label>
                  <Input id="shopName" defaultValue="TechHub Nigeria" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+234 812 345 6789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="hello@techhub.ng" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="123 Computer Village, Ikeja, Lagos" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">Logo & Branding</CardTitle>
                <CardDescription>
                  Customize your receipts and documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-lg bg-secondary flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Logo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG or JPG, max 2MB
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input id="tagline" placeholder="Your trusted tech partner" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://techhub.ng" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users & Roles */}
        <TabsContent value="users">
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Team Members</CardTitle>
                  <CardDescription>
                    Manage user accounts and permissions
                  </CardDescription>
                </div>
                <Button>
                  <Users className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Adebayo Okonkwo", email: "adebayo@techhub.ng", role: "Admin" },
                  { name: "Emeka Adeyemi", email: "emeka@techhub.ng", role: "Technician" },
                  { name: "Tunde Bakare", email: "tunde@techhub.ng", role: "Technician" },
                  { name: "Chioma Eze", email: "chioma@techhub.ng", role: "Sales" },
                ].map((user) => (
                  <div
                    key={user.email}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm bg-secondary px-2 py-1 rounded">
                        {user.role}
                      </span>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Settings */}
        <TabsContent value="financial">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">Currency & Tax</CardTitle>
                <CardDescription>
                  Configure financial settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Primary Currency</Label>
                  <Input value="NGN - Nigerian Naira" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax">Default Tax Rate (%)</Label>
                  <Input id="tax" type="number" defaultValue="7.5" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Apply tax by default</p>
                    <p className="text-xs text-muted-foreground">
                      Automatically add tax to sales
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">Invoice Settings</CardTitle>
                <CardDescription>
                  Customize invoice numbering and terms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prefix">Invoice Prefix</Label>
                  <Input id="prefix" defaultValue="INV-" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nextNum">Next Invoice Number</Label>
                  <Input id="nextNum" type="number" defaultValue="1247" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="terms">Default Payment Terms (days)</Label>
                  <Input id="terms" type="number" defaultValue="7" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Templates */}
        <TabsContent value="templates">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Document Templates</CardTitle>
              <CardDescription>
                Customize text that appears on printed documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="invoiceFooter">Invoice Footer Text</Label>
                <textarea
                  id="invoiceFooter"
                  className="w-full min-h-[100px] rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  defaultValue="Thank you for your business! Returns accepted within 7 days with original receipt. Warranty as per manufacturer terms."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repairTerms">Repair Terms & Conditions</Label>
                <textarea
                  id="repairTerms"
                  className="w-full min-h-[100px] rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  defaultValue="Repairs are warranted for 30 days from collection date. Customer must collect device within 14 days of completion. Uncollected devices may be disposed after 90 days."
                />
              </div>
              <Button>Save Templates</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Notification Preferences</CardTitle>
              <CardDescription>
                Choose when and how to receive alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Low Stock Alerts", description: "When items fall below minimum level" },
                { title: "Large Transactions", description: "Sales or expenses above ₦500,000" },
                { title: "New Investor Activity", description: "Contributions and payout requests" },
                { title: "Repair Status Updates", description: "When tickets change status" },
                { title: "Daily Summary", description: "End of day business summary" },
              ].map((pref) => (
                <div
                  key={pref.title}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                >
                  <div>
                    <p className="font-medium text-sm">{pref.title}</p>
                    <p className="text-xs text-muted-foreground">{pref.description}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
