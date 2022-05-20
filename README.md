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

- [ ] Alter config controls so they don't take effect until an Apply button is pushed.
- [ ] Make designs transition as the seed is changed
- [ ] Host on a public domain and supply link to README file
