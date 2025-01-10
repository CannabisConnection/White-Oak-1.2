import { CheckCircle } from 'lucide-react';

interface OrderSuccessModalProps {
  onClose: () => void;
  orderCount: number;
}

export default function OrderSuccessModal({ onClose, orderCount }: OrderSuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Thanks for the {orderCount > 1 ? `${orderCount} Orders` : 'Order'}!
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          You will receive email updates as {orderCount > 1 ? 'these orders are' : 'the order is'} processed. 
          If you have any questions please call us at 203-626-2024.
        </p>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}
