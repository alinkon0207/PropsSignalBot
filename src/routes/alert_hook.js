
import Router from 'express';

import { lastPrices } from '../controllers/prices.js';
import { broadcastAlert } from '../controllers/alerts.js';


export const router = Router();

const prices = lastPrices();


router.post('/buy_btc', (req, resp) => {
    console.log('received buy_btc alert!');
    
    broadcastAlert({
        trade: 'LONG', 
        baseToken: 'BTC', 
        quoteToken: 'USDT', 
        price: prices.get('BTC')
    });
    
    resp.status(200).json({ success: true });
});

router.post('/sell_btc', (req, resp) => {
    console.log('received sell_btc alert!');
    
    broadcastAlert({
        trade: 'SHORT', 
        baseToken: 'BTC', 
        quoteToken: 'USDT', 
        price: prices.get('BTC')
    });
    
    resp.status(200).json({ success: true });
});


router.post('/buy_eth', (req, resp) => {
    console.log('received buy_eth alert!');
    
    broadcastAlert({
        trade: 'LONG', 
        baseToken: 'ETH', 
        quoteToken: 'USDT', 
        price: prices.get('ETH')
    });
    
    resp.status(200).json({ success: true });
});

router.post('/sell_eth', (req, resp) => {
    console.log('received sell_eth alert!');
    
    broadcastAlert({
        trade: 'SHORT', 
        baseToken: 'ETH', 
        quoteToken: 'USDT', 
        price: prices.get('ETH')
    });
    
    resp.status(200).json({ success: true });
});


router.post('/buy_sol', (req, resp) => {
    console.log('received buy_sol alert!');
    
    broadcastAlert({
        trade: 'LONG', 
        baseToken: 'SOL', 
        quoteToken: 'USDT', 
        price: prices.get('SOL')
    });
    
    resp.status(200).json({ success: true });
});

router.post('/sell_sol', (req, resp) => {
    console.log('received sell_sol alert!');
    
    broadcastAlert({
        trade: 'SHORT', 
        baseToken: 'SOL', 
        quoteToken: 'USDT', 
        price: prices.get('SOL')
    });
    
    resp.status(200).json({ success: true });
});
