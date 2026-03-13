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

export const WITHDRAWAL_CURRENCIES = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', network: 'Bitcoin' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', network: 'ERC20' },
  { id: 'usdt_trc20', name: 'Tether TRC20', symbol: 'USDT', network: 'TRC20' },
  { id: 'usdt_erc20', name: 'Tether ERC20', symbol: 'USDT', network: 'ERC20' },
  { id: 'usdc', name: 'USD Coin', symbol: 'USDC', network: 'ERC20' },
  { id: 'trx', name: 'Tron', symbol: 'TRX', network: 'TRC20' },
  { id: 'sol', name: 'Solana', symbol: 'SOL', network: 'Solana' },
  { id: 'xrp', name: 'Ripple', symbol: 'XRP', network: 'Ripple' },
  { id: 'ltc', name: 'Litecoin', symbol: 'LTC', network: 'Litecoin' },
  { id: 'bnb', name: 'Binance Coin', symbol: 'BNB', network: 'BEP20' },
  { id: 'matic', name: 'Polygon', symbol: 'MATIC', network: 'Polygon' }
];