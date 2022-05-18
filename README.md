# Kaleido

Random generation of radially symmetric designs. Uses psudo random number generation so a given seed may be used to reproduce the same design.

![alt text](https://github.com/JoeTheDave/kaleido/blob/master/example.png)

## Local Setup

```sh
npm install
npm run dev

// runs at http://localhost:3005
```

## TODO

- [ ] Bug: When using settings button to change size, borders reside from previous size configuration. UGLY
- [ ] Bug: Memoization around the kaleidoGen function was removed because it hindered re-render after settings change.
- [ ] Bug: Default size 40 should not have a querystring param
- [ ] Bug: Remove out 1px border

- [ ] Populate more color palettes and include config options to switch between them.
- [ ] Add config control for radius coefficient
- [ ] Add config control for segment length coefficient range
- [ ] Alter config controls so they don't take effect until an Apply button is pushed.
