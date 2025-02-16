
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import InventoryTable from "@/components/InventoryTable";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import MLDataReceiver from "@/components/MLDataReceiver";
import Invoice from "@/components/Invoice";
import { useToast } from "@/components/ui/use-toast";

export type Product = {
  id: string;
  name: string;
  manufacturingDate: string;
  expiryDate: string;
  price: number;
  quantity: number;
};

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showPrintView, setShowPrintView] = useState(false);
  const { toast } = useToast();

  const handleMLData = (data: any) => {
    try {
      const parsedData = JSON.parse(data);
      setProducts((prev) => [...prev, parsedData]);
      toast({
        title: "Data Received",
        description: "New product data has been added to inventory.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process ML data",
        variant: "destructive",
      });
    }
  };

  const handlePrint = () => {
    setShowPrintView(true);
    setTimeout(() => {
      window.print();
      setShowPrintView(false);
    }, 100);
  };

  if (showPrintView) {
    return <Invoice products={products} />;
  }

  return (
    <DashboardLayout>
      <div className="container px-4 py-8 mx-auto space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Inventory Management</h1>
            <p className="mt-2 text-gray-600">Monitor your products and expiry dates</p>
          </div>
          <Button variant="outline" onClick={handlePrint} className="print:hidden">
            Generate Invoice
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 backdrop-blur-sm bg-card">
            <h2 className="text-xl font-semibold mb-4">ML Data Receiver</h2>
            <MLDataReceiver onDataReceived={handleMLData} />
          </Card>

          <Card className="p-6 backdrop-blur-sm bg-card">
            <h2 className="text-xl font-semibold mb-4">QR Code Generator</h2>
            <QRCodeGenerator products={products} />
          </Card>
        </div>

        <Card className="p-6 backdrop-blur-sm bg-card">
          <h2 className="text-xl font-semibold mb-4">Inventory</h2>
          <InventoryTable products={products} />
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Index;
