export const PAYMENT_ADDRESSES = {
  tether: 'TDYmqnoV2fVb1ydUpNHR1t1DaW7UkbBg5J',
  solana: 'AWxVag65WMgTiHB5E7SDBr1jwjnWyzuq9dvn6g5y5k4a',
  trx: 'TDYmqnoV2fVb1ydUpNHR1t1DaW7UkbBg5J'
};

export const SUPPORTED_CURRENCIES = [
  { 
    name: 'Tether (USDT)', 
    symbol: 'USDT', 
    address: PAYMENT_ADDRESSES.tether,
    network: 'TRC20'
  },
  { 
    name: 'Solana', 
    symbol: 'SOL', 
    address: PAYMENT_ADDRESSES.solana,
    network: 'Solana'
  },
  { 
    name: 'Tron', 
    symbol: 'TRX', 
    address: PAYMENT_ADDRESSES.trx,
    network: 'TRC20'
  }
];