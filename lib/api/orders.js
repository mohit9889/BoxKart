import { apiClient } from './client';

/**
 * Map backend order status to frontend display properties
 */
export const mapOrderStatus = (status) => {
  switch (status) {
    case 'PENDING':
    case 'CONFIRMED':
    case 'PROCESSING':
    case 'READY_TO_SHIP':
      return {
        label: 'Processing',
        color: 'text-[var(--color-info)]',
        icon: 'Package',
      };
    case 'SHIPPED':
      return {
        label: 'In Transit',
        color: 'text-[var(--color-info)]',
        icon: 'Truck',
      };
    case 'DELIVERED':
      return {
        label: 'Delivered',
        color: 'text-[var(--color-accent)]',
        icon: 'CheckCircle',
      };
    case 'CANCELLED':
    case 'FAILED':
      return {
        label: 'Cancelled',
        color: 'text-[var(--color-danger)]',
        icon: 'XCircle',
      };
    default:
      return {
        label: 'Unknown',
        color: 'text-[var(--color-text-tertiary)]',
        icon: 'Clock',
      };
  }
};

/**
 * Format currency minor unit to INR string
 */
export const formatCurrency = (minorAmount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format((minorAmount || 0) / 100);
};

/**
 * Standardize API Order to frontend expected shape
 */
export const mapOrderFromApi = (apiOrder) => {
  const statusInfo = mapOrderStatus(apiOrder.status);

  // Format dates: '14 Jul 2026'
  const dateObj = apiOrder.createdAt
    ? new Date(apiOrder.createdAt)
    : new Date();
  const dateFormatted = dateObj.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // Describe items briefly for lists
  let itemsSummary = 'No items';
  if (apiOrder.items && apiOrder.items.length > 0) {
    const firstItem = apiOrder.items[0];
    itemsSummary = `${firstItem.quantity} × ${firstItem.nameSnapshot || 'Product'}`;
    if (apiOrder.items.length > 1) {
      itemsSummary += ` & ${apiOrder.items.length - 1} more item(s)`;
    }
  }

  return {
    ...apiOrder,
    id: apiOrder.id,
    orderNumber: apiOrder.orderNumber,
    date: dateFormatted,
    rawDate: dateObj,
    items: apiOrder.items,
    itemsSummary: itemsSummary,
    total: formatCurrency(apiOrder.totalMinor),
    subtotal: formatCurrency(apiOrder.subtotalMinor),
    status: statusInfo.label,
    rawStatus: apiOrder.status,
    statusColor: statusInfo.color,
    statusIcon: statusInfo.icon,
  };
};

export const ordersApi = {
  /**
   * Get orders for the authenticated user
   */
  getOrders: async (params = { page: 1, limit: 20 }) => {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/orders?${query}` : '/orders';
    const response = await apiClient.get(endpoint);
    return {
      ...response,
      data: (response?.data || []).map(mapOrderFromApi),
    };
  },

  /**
   * Get a single order by ID
   */
  getOrderById: async (orderId) => {
    const response = await apiClient.get(`/orders/${orderId}`);
    return {
      ...response,
      data: mapOrderFromApi(response.data),
    };
  },
};
