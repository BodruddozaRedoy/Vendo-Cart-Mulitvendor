'use client';

import React from 'react';
import { FaShippingFast, FaGift, FaUndoAlt, FaLock } from 'react-icons/fa';
import { BiSupport } from 'react-icons/bi';

const features = [
  {
    title: 'Free Delivery',
    description: 'Enjoy free shipping on all orders.',
    icon: <FaShippingFast className="text-3xl text-primary" />,
  },
  {
    title: 'Support 24/7',
    description: 'We are available anytime you need help.',
    icon: <BiSupport className="text-3xl text-primary" />,
  },
  {
    title: 'Gift Voucher',
    description: 'Surprise your loved ones with gift vouchers.',
    icon: <FaGift className="text-3xl text-primary" />,
  },
  {
    title: 'Return & Refund',
    description: 'Easy return and full refund guarantee.',
    icon: <FaUndoAlt className="text-3xl text-primary" />,
  },
  {
    title: 'Secure Payment',
    description: '100% secure payment and protection.',
    icon: <FaLock className="text-3xl text-primary" />,
  },
];

export default function Features() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg border hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
