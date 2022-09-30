import * as events from 'events';
import {EventEmitter} from 'events';

const emitter = new EventEmitter();

emitter.on('myevent', (payload, status) => {
    console.log(`Event received: ${JSON.stringify(payload)}, status: ${JSON.stringify(status)}`);
});

const secondListener = (payload, status) => {
    console.log(`Second listener: ${JSON.stringify(payload)}, status: ${JSON.stringify(status)}`);
}

emitter.on('myevent', secondListener);

setTimeout(() => {emitter.off('myevent', secondListener)}, 10000)

emitter.emit('myevent')
emitter.emit('myevent', {name: 'Trayan', age:45})
emitter.emit('myevent', {name: 'Trayan', age:45}, 'active')

let num = 0;
const interval = setInterval(() => emitter.emit('myevent', {num: (++num), name: 'Trayan', age:45}, 'active'), 3000)
