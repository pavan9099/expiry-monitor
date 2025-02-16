
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// This is a mock component for demo purposes
// In production, you would implement actual WebSocket or API integration
const MLDataReceiver = ({ onDataReceived }: { onDataReceived: (data: any) => void }) => {
  const [isConnected, setIsConnected] = useState(false);

  const mockData = {
    id: Math.random().toString(36).substr(2, 9),
    name: "Test Product",
    manufacturingDate: new Date().toISOString(),
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    price: Math.floor(Math.random() * 100) + 1,
    quantity: Math.floor(Math.random() * 50) + 1,
  };

  const handleConnect = () => {
    setIsConnected(true);
    // Simulate receiving data from ML model
    onDataReceived(JSON.stringify(mockData));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div
          className={`w-3 h-3 rounded-full ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span className="text-sm text-gray-600">
          {isConnected ? "Connected to ML Model" : "Disconnected"}
        </span>
      </div>
      <Button
        onClick={handleConnect}
        variant={isConnected ? "secondary" : "default"}
        className="w-full"
      >
        {isConnected ? "Receive Test Data" : "Connect to ML Model"}
      </Button>
    </div>
  );
};

export default MLDataReceiver;
