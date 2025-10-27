import { RemoteParticipantResponseType } from './RemoteParticipantResponseType';

export interface RemoteParticipantListResponseType {
  members: RemoteParticipantResponseType[];
  users: RemoteParticipantResponseType[];
}
