
import { QRCodeSVG } from "qrcode.react";
import { Product } from "@/pages/Index";
import { Card } from "@/components/ui/card";

const QRCodeGenerator = ({ products }: { products: Product[] }) => {
  const qrData = JSON.stringify(
    products.map((p) => ({
      id: p.id,
      expiryDate: p.expiryDate,
    }))
  );

  return (
    <div className="flex flex-col items-center space-y-4">
      {products.length > 0 ? (
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <QRCodeSVG value={qrData} size={200} />
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          Add products to generate QR code
        </p>
      )}
    </div>
  );
};

export default QRCodeGenerator;
