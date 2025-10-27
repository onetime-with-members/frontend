import { ParticipantType } from './ParticipantType';
import { RemoteMemberFilterType } from './RemoteMemberFilterType';

export class MemberFilterType {
  private readonly _users: number[];
  private readonly _guests: number[];

  constructor(memberFilter: RemoteMemberFilterType) {
    this._users = memberFilter.users;
    this._guests = memberFilter.guests;
  }

  static fromParticipants(participants: ParticipantType[]): MemberFilterType {
    return new MemberFilterType({
      users: participants.filter((p) => p.type === 'USER').map((p) => p.id),
      guests: participants.filter((p) => p.type === 'GUEST').map((p) => p.id),
    });
  }

  get users() {
    return this._users;
  }

  get guests() {
    return this._guests;
  }
}
