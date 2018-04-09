import { Place } from '@app/modules/places/models';
import { ItineraryPlacesService } from '@app/modules/places/services';
import { AutocompleteState } from '@app/modules/places/state/autocomplete.state';
import { FilterState, FilterStateModel } from '@app/modules/places/state/filter.state';
import { GetPlaces, GetPlacesSuccess } from '@app/modules/places/state/places.actions';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { map } from 'rxjs/operators/map';

export interface PlacesStateModel {
  loading: boolean;
  items: Place[];
}

@State<PlacesStateModel>({
  name: 'places',
  defaults: {
    loading: false,
    items: []
  },
  children: [FilterState, AutocompleteState]
})
export class PlacesState {
  @Selector()
  public static loading(state: PlacesStateModel): boolean {
    return state.loading;
  }

  @Selector()
  public static places(state: PlacesStateModel): Place[] {
    return state.items;
  }

  constructor(private store: Store, private service: ItineraryPlacesService) {}

  @Action(GetPlaces)
  getPlaces({ patchState, dispatch }: StateContext<PlacesStateModel>) {
    patchState({ loading: true });
    const filter = <FilterStateModel>this.store.selectSnapshot(state => {
      return state.places.filter;
    });

    return this.service
      .getPlaces(filter.distance, filter.rating, filter.reviews, filter.location)
      .pipe(map(places => dispatch(new GetPlacesSuccess(places))));
  }

  @Action(GetPlacesSuccess)
  getAutocompleteSuccess({ patchState, setState }: StateContext<PlacesStateModel>, { payload }: GetPlacesSuccess) {
    return patchState({ loading: false, items: payload });
  }
}
