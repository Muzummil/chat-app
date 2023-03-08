// External Dependencies
import { of, from } from "rxjs";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";
// Internal Dependencies
import {
  loadChannelsList,
  loadChannelsListSuccess,
  loadUChannelsListFailure,
} from "@app/chat/features/channels-module/data-access/state/channels.actions";
import { ChannelsList } from "@app/chat/features/channels-module/models/ChannelsList";
import { ChannelsService } from "@app/chat/features/channels-module/data-access/channels-service/channels.service";
/**
 * Channels List Effects Class
 */
@Injectable()
export class ChannelsListEffects {
  /**
   * Users Effects Constructor
   * @param {Actions} _actions$
   * @param {ChannelsService} _channelsService
   */
  constructor(
    private readonly _actions$: Actions,
    private readonly _channelsService: ChannelsService
  ) {}
  /**
   * Effect to load channels list from API and returning to reducer
   */
  loadChannelsList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadChannelsList),
      switchMap(() =>
        from(this._channelsService.getChannelsList()).pipe(
          // Take the returned value and return a new success action containing the ChannelsList
          map((channels: ChannelsList) =>
            loadChannelsListSuccess({ channels: channels })
          ),
          // Or... if it errors return a new failure action containing the error
          catchError((error: string) => of(loadUChannelsListFailure({ error })))
        )
      )
    )
  );
}
