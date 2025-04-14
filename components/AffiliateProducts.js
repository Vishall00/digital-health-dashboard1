'use client';

import { useAffiliate } from '../app/context/AffiliateContext';
import Image from 'next/image';

const AffiliateProducts = () => {
  const { recommendedProducts, trackAffiliateClick } = useAffiliate();

  if (!recommendedProducts.length) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recommended Products</h2>
        <p className="text-sm text-gray-500">
          We earn a small commission if you make a purchase through these links – at no extra cost to you!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendedProducts.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">{product.price}</span>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="text-sm">{product.rating}</span>
                </div>
              </div>
              <a
                href={product.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAffiliateClick(product.id)}
                className="mt-4 block w-full text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                View Product
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffiliateProducts; 