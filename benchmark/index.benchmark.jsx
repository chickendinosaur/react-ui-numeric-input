import 'lodash';
import Benchmark from 'benchmark';
import React from 'react';
import ReactDOM from 'react-dom';

import Component from '../src/index.jsx';

const suite = new Benchmark.Suite();
window.Benchmark = Benchmark;

const rootEl = document.createElement('div');

/*
Setup
*/

/*
Benchmark
*/

suite
    .add('value="1"', function () {
      ReactDOM.render(
        <Component
          value="1"
        />,
        rootEl
      );
    })
    .add('value={Math.random(10)}', function () {
      ReactDOM.render(
        <Component
          value={Math.random(10)}
        />,
        rootEl
      );
    })
    .on('cycle', function (event) {
      let output = String(event.target);
      output = output.substring(0, output.indexOf('ops/sec') + 7);
      console.log('\x1b[33m%s\x1b[0m', output);
    })
    .on('complete', function () {
      window.close();
    })
    // Run async
    .run({ async: false });
