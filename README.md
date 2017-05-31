React numeric input textfield with no dependencies.

---

# Getting Started

## Installation

### npm

npm install @chickendinosaur/react-ui-numeric-input

## Usage

```javascript
import NumericInput from '@chickendinosaur/react-ui-numeric-input';

React.render(
  <NumericInput
    value="1"
    min={-1}
    max={1}
    step={0.1}
    precision={1}
    loop={true}
    onChange={(value) => {
      console.log(value);
    }}
  />,
  document.getElementById('body')
);
```
---

Styles for each internal component can be overridden via inline style objects.

CSS variables for the component can be remapped buy adding:

:root {
--varname: value !important;
}

# Development

## Installation

* git clone https://github.com/chickendinosaur/react-ui-numeric-input.git
* cd react-ui-numeric-input
* npm install

## Build

* npm run build

## Benchmarking

* npm run benchmark

## Test

* npm run test

## Publish

* npm run deploy

---

# License

The MIT License (MIT)

Copyright (c) 2016 John Pittman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &#34;Software&#34;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &#34;AS IS&#34;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
