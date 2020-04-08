import test from 'tape';
import {EventEmitter} from '../';

test('basics', t => {
    const ee = new EventEmitter<{a: (a: number) => void}>();

    t.plan(1);

    ee.emit('a', 1);

    ee.on('a', arg => {
        t.is(arg, 2);
    });

    ee.emit('a', 2);

    t.end();
});

test('unsibscribe with off method', t => {
    const ee = new EventEmitter<{a: (a: number) => void}>();

    t.plan(1);

    const handler = (arg: number): void => {
        t.is(arg, 1);
    };

    ee.on('a', handler);

    ee.emit('a', 1);

    ee.off('a', handler);

    ee.emit('a', 2);

    t.end();
});

test('unsibscribe with result of on method', t => {
    const ee = new EventEmitter<{a: (a: number) => void}>();

    t.plan(1);

    const unsubscribe = ee.on('a', arg => {
        t.is(arg, 1);
    });

    ee.emit('a', 1);

    unsubscribe();

    ee.emit('a', 2);

    t.end();
});

test('listen to the same event twice', t => {
    const ee = new EventEmitter<{a: (a: number) => void}>();

    t.plan(2);


    ee.on('a', arg => {
        t.is(arg, 1);
    });

    ee.on('a', arg => {
        t.is(arg, 1);
    });

    ee.emit('a', 1);

    t.end();
});

test('offing not existed event/listener is ok', t => {
    const ee = new EventEmitter<{a: (a: number) => void}>();

    ee.off('a', () => 0);

    t.end();
});