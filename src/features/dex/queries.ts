import { Client } from 'coreum-js-nightly';
import { Order, Side } from 'coreum-js-nightly/dist/main/coreum/dex/v1/order';

export async function getOpenOrders(
  client: Client,
  baseDenom: string,
  quoteDenom: string,
  address?: string
): Promise<Order[]> {
  try {
    const [sellOrders, buyOrders] = await Promise.all([
      client.queryClients.dex.orderbook({
        baseDenom: baseDenom,
        quoteDenom: quoteDenom,
        side: Side.SIDE_SELL,
        pagination: undefined
      }),
      client.queryClients.dex.orderbook({
        baseDenom: baseDenom,
        quoteDenom: quoteDenom,
        side: Side.SIDE_BUY,
        pagination: undefined
      })
    ]);

    return [...sellOrders.orders, ...buyOrders.orders];
  } catch (error) {
    console.error('Error fetching open orders:', error);
    return [];
  }
}

export async function getOrderHistory(
  client: Client,
  baseDenom: string,
  quoteDenom: string,
  address?: string
): Promise<Order[]> {
  try {
    const response = await client.queryClients.dex.orders({
      creator: address || "",
      pagination: undefined
    });
    return response.orders.filter((order: Order) => 
      order.remainingQuantity === '0'
    );
  } catch (error) {
    console.error('Error fetching order history:', error);
    return [];
  }
}

// Helper function to format order data for display
export function formatOrder(order: Order) {
  return {
    side: order.side === Side.SIDE_BUY ? 'Buy' : 'Sell',
    price: order.price,
    volume: order.quantity,
    total: (Number(order.price) * Number(order.quantity)).toString(),
    remainingQuantity: order.remainingQuantity,
    status: order.remainingQuantity === '0' ? 'Completed' : 'Open'
  };
} 
