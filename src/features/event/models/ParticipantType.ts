import { ParticipantResponseType } from './ParticipantResponseType';

export interface ParticipantType extends ParticipantResponseType {
  type: 'GUEST' | 'USER';
}
