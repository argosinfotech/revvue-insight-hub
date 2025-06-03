
import DashboardLayout from "@/components/DashboardLayout";

interface BillingPackage {
  id: string;
  name: string;
  price: number;
  features: string[];
}

const Billing = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Billing & Packages</h1>
          <p className="text-muted-foreground">
            Manage billing and subscription packages
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Basic Package</h3>
            <p className="text-2xl font-bold mb-4">$29/month</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Up to 5 hotels</li>
              <li>• Basic analytics</li>
              <li>• Email support</li>
            </ul>
          </div>
          
          <div className="p-6 border rounded-lg border-brand-purple">
            <h3 className="text-lg font-semibold mb-2">Pro Package</h3>
            <p className="text-2xl font-bold mb-4">$99/month</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Up to 20 hotels</li>
              <li>• Advanced analytics</li>
              <li>• Priority support</li>
              <li>• API access</li>
            </ul>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Enterprise</h3>
            <p className="text-2xl font-bold mb-4">Custom</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Unlimited hotels</li>
              <li>• Custom integrations</li>
              <li>• Dedicated support</li>
              <li>• White label options</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
