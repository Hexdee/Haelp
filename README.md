# Haelp

A crowdfunding aepp on Aeternity blockchain

## Built with

- [React](https://reactjs.org)
- [Sophia](https://docs.aeternity.com/aesophia/)
- [AeSdk](https://docs.aeternity.com/aepp-sdk-js)

## Running locally

- Confirm that [NodeJs](https://nodejs.org/en/download/) and npm is installed on your local system

```bash
npm -v
```

- Clone this repository

```bash
git clone https://github.com/hexdee/haelp
```

- Move into the directoty

```bash
cd haelp
```

- Install dependencies

```bash
npm install
```

- Deploy smart contract

```bash
cd src/contract && node deploy.js
```

- Copy contract address and update `line 4` of  [aeternity.js](/src/utils/aeternity.js) with the new address

```javascript
export const contractAddress = "The deployed contract address";
```

- Start dev server

```bash
npm start
```
