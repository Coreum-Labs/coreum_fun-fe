# Coreum.fun: The No Loss Draft

[![Website](https://img.shields.io/badge/Website-coreum.fun-blue)](https://coreum.fun)

This repository contains the code for the Coreum.fun website and Smart Contract - a simple and easy-to-understand implementation of a No Loss Draft on Coreum, leveraging the Coreum Orderbook DEX and Smart Tokens.

## 📋 Overview

### 🎯 Why We Built This

- Create a simple implementation leveraging Coreum Orderbook DEX (released in v5)
- Build a fun and engaging community application
- Increase exposure to the [Coreum Labs](https://coreum.com/labs) [validator node](https://validator.info/coreum/corevaloper14e0slqpzhgsakm6fwnh5sk6mu2dmdc9ghxhuw5)

### 🎲 What is a No Loss Draft?

A No Loss Draft is a system where:

- Participants buy tickets at a fixed price
- All participants get their tokens back at the end of the draw
- The yield generated is used to pay winners

### ⚙️ How It Works

1. **Ticket Purchase**

   - Each ticket is a Smart Token
   - Fixed price: 200 COREUM per ticket
   - Limited supply: 500 tickets total

2. **Token Management**

   - COREUM is staked to Coreum Labs validator node
   - Tickets represent claims on the token pool
   - Yield from staking is used for payouts

3. **Trading**

   - Tickets can be traded on Coreum Orderbook DEX
   - Secondary market allows price discovery
   - Tickets can be burned to reclaim COREUM

4. **Draw Process**
   - Countdown starts when all tickets are sold
   - Random number generation selects winner
   - Participants can burn tickets to reclaim COREUM

## 🔍 Key Concepts

### No Loss Draft

- Inspired by PoolTogether (2017, Ethereum)
- Participants get their tokens back after the draw
- Yield generated through validator staking
- More efficient implementation on Coreum's PoS network

### Coreum Orderbook DEX

A permissionless Orderbook built at the protocol level of Coreum blockchain.
[Learn more about Coreum Orderbook DEX](https://github.com/CoreumFoundation/coreum/tree/master/x/dex/spec)

### Trading Pairs Explained

#### Base Token

- The token being bought/sold
- Quantity shown on the left side of orderbook
- Example: "100 TICKET" means trading 100 TICKET

#### Quote Token

- The token used for pricing
- Price shown on the right side of orderbook
- Example: "1.5 COREUM" means price is 1.5 COREUM per TICKET

#### Example: TICKET/COREUM Pair

- Buy TICKET → Pay in COREUM
- Sell TICKET → Receive COREUM
- Price expressed in COREUM per TICKET

## 🚀 Getting Started

### Frontend Development

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Start development server
npm run dev

# Access the application
# Open http://localhost:3000 in your browser
```

### Smart Contract Development

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Start development server
npm run dev

# Access the application
# Open http://localhost:3000 in your browser
```

## 📄 License

This project is licensed under the Apache 2.0 License.
