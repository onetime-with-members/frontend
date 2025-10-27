import { RemoteParticipantListResponseType } from './RemoteParticipantListResponseType';
import { RemoteParticipantType } from './RemoteParticipantType';

export class ParticipantType {
  private readonly _id: number;
  private readonly _name: string;
  private readonly _type: 'GUEST' | 'USER';

  constructor(participant: RemoteParticipantType) {
    this._id = participant.id;
    this._name = participant.name;
    this._type = participant.type;
  }

  static fromResponse({
    members: guests,
    users,
  }: RemoteParticipantListResponseType) {
    return guests
      .map(
        (guest) =>
          new ParticipantType({
            ...guest,
            type: 'GUEST',
          }),
      )
      .concat(
        users.map(
          (user) =>
            new ParticipantType({
              ...user,
              type: 'USER',
            }),
        ),
      );
  }

  static filter(
    participants: ParticipantType[],
    participant: ParticipantType,
  ): ParticipantType[] {
    return participants.includes(participant)
      ? participants.filter((p) => p !== participant)
      : [...participants, participant];
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }
}
