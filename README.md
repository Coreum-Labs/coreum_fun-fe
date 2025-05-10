This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Currency Pair: Concept of Base and Quote Tokens

In a trading pair (like TICKET/COREUM), there are two important concepts to understand:

### Base Token

- This is the token you're actually buying or selling
- The amount of base token is what you're trading
- In the orderbook, this is the token whose quantity is shown on the left side
- For example, if you see "100 TICKET" in an order, it means someone wants to buy/sell 100 TICKET

### Quote Token

- This is the token you're using to price the base token
- It's the currency you're using to buy or sell the base token
- In the orderbook, this is the token whose price is shown on the right side
- For example, if you see "1.5 COREUM" in an order, it means the price is 1.5 COREUM per TICKET

### Example

In our TICKET/COREUM pair:

- If you want to buy TICKET, you'll pay in COREUM
- If you want to sell TICKET, you'll receive COREUM
- The price is always expressed as how many COREUM you need to pay for 1 TICKET

When we swap the pair (COREUM/TICKET):

- COREUM becomes the base token (what you're trading)
- TICKET becomes the quote token (what you're using to price)
- The price would then be expressed as how many TICKET you need to pay for 1 COREUM

# coreum.fun
