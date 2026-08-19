'use client';

import { useState } from 'react';
import { calculateShipping } from '@/lib/delivery';
import Icon from '@/components/common/Icon';

/**
 * Pincode checker component — shows estimated delivery time
 * and shipping cost for a given pincode.
 */
export default function PincodeChecker({ product, selectedQty = 100 }) {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState(null);

  const [isLocating, setIsLocating] = useState(false);

  const handleCheck = () => {
    if (!pincode || pincode.length !== 6) {
      setResult({ error: 'Please enter a 6-digit pincode.' });
      return;
    }
    const res = calculateShipping({ pincode, product, quantity: selectedQty });
    setResult(res);
  };

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setResult({ error: 'Geolocation is not supported by your browser.' });
      return;
    }

    setIsLocating(true);
    setResult(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const postcode = data.address?.postcode;

          if (postcode) {
            const cleanPostcode = postcode.replace(/\D/g, '').slice(0, 6);
            setPincode(cleanPostcode);
          } else {
            setResult({ error: 'Could not detect pincode for your location.' });
          }
        } catch (error) {
          setResult({ error: 'Failed to retrieve location details.' });
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        setResult({ error: 'Location access denied.' });
      }
    );
  };

  return (
    <div className="card-bk p-4 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <Icon name="MapPin" size={18} className="text-charcoal" />
        <h3 className="font-semibold text-charcoal text-sm">
          Delivery Details
        </h3>
      </div>

      <div className="flex gap-2 mb-2">
        <div className="relative flex-1">
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
            className="input-bk w-full text-sm pr-10"
          />
          <button
            onClick={handleLocate}
            disabled={isLocating}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-text-tertiary hover:text-[var(--color-kraft)] transition-colors"
            title="Locate me"
          >
            {isLocating ? (
              <Icon
                name="Loader2"
                size={16}
                className="animate-spin text-[var(--color-kraft)]"
              />
            ) : (
              <Icon name="LocateFixed" size={16} />
            )}
          </button>
        </div>
        <button
          onClick={handleCheck}
          className="btn-secondary whitespace-nowrap text-sm px-4"
        >
          Check
        </button>
      </div>

      {result && (
        <div className="mt-3 pt-3 border-t border-border">
          {result.error ? (
            <div className="flex gap-2 text-red-600 text-sm">
              <Icon name="AlertCircle" size={16} className="shrink-0 mt-0.5" />
              <span>{result.error}</span>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-start text-sm">
                <span className="text-text-secondary flex items-center gap-1.5">
                  <Icon name="Truck" size={14} /> Estimated Delivery
                </span>
                <span className="font-medium text-charcoal">
                  {result.estimatedDays}
                </span>
              </div>
              <div className="flex justify-between items-start text-sm">
                <span className="text-text-secondary">Est. Shipping Cost</span>
                <span className="font-medium text-charcoal">
                  ₹{result.shippingCost.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
