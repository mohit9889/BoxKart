'use client';

import { useState } from 'react';
import Icon from '@/components/common/Icon';
import BulkOrderForm from '@/components/bulk-orders/RFQ/BulkOrderForm';
import BulkUploadForm from '@/components/bulk-orders/BulkUpload/BulkUploadForm';

const TABS = [
  { id: 'rfq', label: 'Request Quote', icon: 'FileText' },
  { id: 'upload', label: 'Bulk Upload', icon: 'Package' },
];

export default function BulkOrdersTabs() {
  const [activeTab, setActiveTab] = useState('rfq');

  return (
    <section className="section-padding">
      <div className="container-bk max-w-3xl">
        {/* Tab Switcher */}
        <div
          className="flex items-center gap-1 bg-warm-gray rounded-xl p-1 mb-8"
          role="tablist"
          aria-label="Bulk order method"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-charcoal shadow-sm'
                  : 'text-text-secondary hover:text-charcoal'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        <div
          id="panel-rfq"
          role="tabpanel"
          aria-labelledby="tab-rfq"
          hidden={activeTab !== 'rfq'}
        >
          {activeTab === 'rfq' && <BulkOrderForm />}
        </div>

        <div
          id="panel-upload"
          role="tabpanel"
          aria-labelledby="tab-upload"
          hidden={activeTab !== 'upload'}
        >
          {activeTab === 'upload' && <BulkUploadForm />}
        </div>
      </div>
    </section>
  );
}
