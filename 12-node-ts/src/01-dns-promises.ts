import { promises, Resolver } from 'dns';  // const dns = require('dns')

const resolver = new Resolver();
resolver.setServers(['4.4.4.4']);

const domain = 'yahoo.com';
(async () => {
    try {
        const addresses = await promises.resolve(domain)
        console.log(`Addresses for ${domain} : ${JSON.stringify(addresses)}`);
        addresses.map(async (addr) => {
            const hostnames = await promises.reverse(addr);
            console.log(`reverse for ${addr} => ${JSON.stringify(hostnames)}`);
        });
    } catch (err) {
        console.log(err);
    }
})()
