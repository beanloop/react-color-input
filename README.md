# react-color-input
[![npm version](https://badge.fury.io/js/react-color-input.svg)](https://badge.fury.io/js/react-color-input)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)

A drop in color picker that is based on [react-color](https://casesandberg.github.io/react-color/).  
It can be used as is as a component for [react-form-helper](https://github.com/beanloop/react-form-helper).

## Install
```
yarn add react-color-input
npm install --save react-color-input
```

## Usage
```typescript
import {ColorPicker} from 'react-color-input'

<ColorPicker
  label='Favorite color'
  value={color}
  onChange={setColor}
/>
```

## License
react-color-input is dual-licensed under Apache 2.0 and MIT terms.
