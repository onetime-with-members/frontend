import { RemoteParticipantResponseType } from './RemoteParticipantResponseType';

export interface RemoteParticipantType extends RemoteParticipantResponseType {
  type: 'GUEST' | 'USER';
}
