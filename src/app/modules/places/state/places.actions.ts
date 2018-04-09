import { Place } from '@app/modules/places/models';

export class GetPlaces {
  static readonly type = '[places] get places';
}

export class GetPlacesSuccess {
  static readonly type = '[places] get places success';
  constructor(public payload: Place[]) {}
}
