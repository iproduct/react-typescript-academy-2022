import * as events from 'events';
import {EventEmitter} from 'events';
import * as Rx from 'rxjs';
import {from, interval, map, zip} from 'rxjs';

const emitter = new EventEmitter();

emitter.on('myevent', (payload, status) => {
    console.log(`Event received: ${JSON.stringify(payload)}, status: ${JSON.stringify(status)}`);
});

const secondListener = (payload, status) => {
    console.log(`Second listener: ${JSON.stringify(payload)}, status: ${JSON.stringify(status)}`);
}

emitter.on('myevent', secondListener);

setTimeout(() => {emitter.off('myevent', secondListener)}, 3000)

emitter.emit('myevent')
emitter.emit('myevent', {name: 'Trayan', age:45})
emitter.emit('myevent', {name: 'Trayan', age:45}, 'active')

let num = 0;

const int = interval(1000);
const data = from(['Hello', 'Reactive', 'Extensions', 'JavaScript', 'from', 'TypeScript'])

const dataStream = zip(data, int).pipe(
    map(([text, num]) => `${num}: ${text} [${new Date().toISOString()}]`)
)

dataStream.subscribe(next => emitter.emit('myevent', {text: next}))

