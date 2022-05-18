# Kaleido

Random generation of radially symmetric designs. Uses psudo random number generation so a given seed may be used to reproduce the same design.

## Local Setup

```sh
npm install
```

## TODO

- [ ] Bug: When using settings button to change size, borders reside from previous size configuration. UGLY
- [ ] Bug: When clicking the randomize seed button, it resets the size setting to the default setting of 40.
- [ ] Populate more color palettes and include config options to switch between them.
- [ ] Bug: Memoization around the kaleidoGen function was removed because it hindered re-render after settings change.
