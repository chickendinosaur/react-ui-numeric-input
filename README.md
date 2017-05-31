React numeric input textfield with no dependencies.

---

# Getting Started

## Installation

#### npm

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

#### Props
Name                  | Type                                | Default
----------------------|-------------------------------------|:-------:
**value**             |`number` or `string` or `null`       | `""` which converts to `null`
**min**               |`number`                             | `Number.MIN_SAFE_INTEGER`
**max**               |`number`                             | `Number.MAX_SAFE_INTEGER`
**precision**         |`number`                             | `0`
**step**              |`number`                             | `1`
**loop**              |`boolean`                            | `false`
**vertical**          |`boolean`                            | `false`
**disabled**          |`boolean`                            | `false`
**textfieldDisabled** |`boolean`                            | `false`
**className**         |`string`                             | `null`
**style**             |`object`                             | `null`
**btnStyle**          |`object`                             | `null`
**textfieldStyle**    |`object`                             | `null`
**onChange**          |`function`                           | `null`

#### Styling

- Each internal component has a style prop that can be overridden via inline style objects.
- CSS can be overridden by passing the component a new class to mit's className prop and overwriting it's immediate
children CSS selectors.

#### Features

- Hold button to auto increase or decrease value by step.

# Development

## Installation

* git clone https://github.com/chickendinosaur/react-ui-numeric-input.git
* cd react-ui-numeric-input
* npm install

## Storybook

* npm run storybook

## Build

* npm run build

## Benchmarking

* npm run benchmark

## Test

* npm run test

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
