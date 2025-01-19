import { EntityError } from '../errors/entity.error';

export default class Location {
  private value: {
    latitude: number;
    longitude: number;
  };

  constructor(longitude: number, latitude: number) {
    if (typeof latitude !== 'number') {
      throw new EntityError(`Invalid latitude in location`);
    }

    if (typeof longitude !== 'number') {
      throw new EntityError(`Invalid longitude in location`);
    }

    this.value = { latitude, longitude };
  }

  getValue() {
    return this.value;
  }
}
