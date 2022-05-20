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
- [ ] Bug: Stupid MaterialUI ButtonRow has the buttons jumping slighly in their layout when different values are selected.

- [ ] Maybe make the config menu less intrusive so you can see the changes better when you apply them?
- [ ] Make designs transition as the seed is changed
- [ ] Host on a public domain and supply link to README file
