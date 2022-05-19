# Kaleido

Random generation of radially symmetric designs. Uses pseudo random number generation so a given seed may be used to reproduce the same design.

![alt text](https://github.com/JoeTheDave/kaleido/blob/master/example.png)

## Local Setup

```sh
npm install
npm run dev

// runs at http://localhost:3005
```

## TODO

- [ ] Bug: Memoization around the kaleidoGen function was removed because it hindered re-render after settings change.
- [ ] Bug: Friendly selection doesn't seem to be working correctly

- [ ] Populate more color palettes and include config options to switch between them.
- [ ] Add config control for radius coefficient
- [ ] Add config control for segment length coefficient range
- [ ] Alter config controls so they don't take effect until an Apply button is pushed.
- [ ] Make designs transition as the seed is changed
- [ ] Build a script that will take guid and scrape the associated palette from https://coolors.co/palettes/trending and add it to the colors.ts file.
- [ ] Add support for any number of colors in a palette. kaleidoGen should not revert to 0, and when drawing the data to screen CellElement will use modulus operator to loop back around to the beginnning of the palette whenever it passes the end of the palette length.
