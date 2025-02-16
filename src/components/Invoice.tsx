
import { Product } from "@/pages/Index";
import { QRCodeSVG } from "qrcode.react";
import { Card } from "@/components/ui/card";

const Invoice = ({ products }: { products: Product[] }) => {
  const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const qrData = JSON.stringify(
    products.map((p) => ({
      id: p.id,
      expiryDate: p.expiryDate,
    }))
  );

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-sm print:shadow-none">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Invoice</h1>
        <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
      </div>

      <div className="mb-8">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="py-2 text-left">Product</th>
              <th className="py-2 text-right">Quantity</th>
              <th className="py-2 text-right">Price</th>
              <th className="py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="py-2">{product.name}</td>
                <td className="py-2 text-right">{product.quantity}</td>
                <td className="py-2 text-right">${product.price.toFixed(2)}</td>
                <td className="py-2 text-right">
                  ${(product.price * product.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
            <tr className="font-bold">
              <td colSpan={3} className="py-2 text-right">Total:</td>
              <td className="py-2 text-right">${total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mb-8">
        <div className="p-4 bg-white">
          <QRCodeSVG value={qrData} size={150} />
        </div>
      </div>

      <div className="text-center text-sm text-gray-600">
        <p>Thank you for your business!</p>
        <p>Scan QR code to verify product details and expiry dates</p>
      </div>
    </div>
  );
};

export default Invoice;
