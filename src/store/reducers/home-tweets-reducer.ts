import { RecordsEntity } from '../../interfaces/records-entity';

const initialState: RecordsEntity[] = [];

enum HomeTweetsActionTypes {
    SET_TWEETS = 'SET_TWEETS',
}

interface SetHomeTweetsAction {
    type: HomeTweetsActionTypes.SET_TWEETS;
    payload: RecordsEntity[];
}

type HomeTweetsActions = SetHomeTweetsAction;

export function homeTweetsReducer(
    homeTweetsState: RecordsEntity[] = initialState,
    homeTweetsAction: HomeTweetsActions,
): RecordsEntity[] {
    switch (homeTweetsAction.type) {
        case HomeTweetsActionTypes.SET_TWEETS:
            return [...homeTweetsState, ...homeTweetsAction.payload];

        default:
            return homeTweetsState;
    }
}
