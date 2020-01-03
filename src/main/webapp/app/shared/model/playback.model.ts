import { Moment } from 'moment';
import { AgentType } from 'app/shared/model/enumerations/agent-type.model';

export interface IPlayback {
  id?: number;
  ip?: string;
  latitude?: number;
  longitude?: number;
  agent?: AgentType;
  date?: Moment;
  userLogin?: string;
  userId?: number;
  trackName?: string;
  trackId?: number;
}

export class Playback implements IPlayback {
  constructor(
    public id?: number,
    public ip?: string,
    public latitude?: number,
    public longitude?: number,
    public agent?: AgentType,
    public date?: Moment,
    public userLogin?: string,
    public userId?: number,
    public trackName?: string,
    public trackId?: number
  ) {}
}
