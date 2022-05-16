import gen from 'random-seed';

export class RandomService {
  generator: any;

  constructor(seed: string) {
    this.generator = gen.create(seed);
  }

  range(min: number, max: number) {
    return this.generator(max - min + 1) + min;
  }
}
