import {jsonArrayMember, jsonMember, jsonObject} from 'typedjson';

@jsonObject
class Auth {
  @jsonMember({constructor: String})
  name: string;
  @jsonMember({constructor: String})
  url: string;
  @jsonMember({constructor: Boolean})
  me: boolean;
}

@jsonObject
class PubKey {
  @jsonMember({constructor: Number})
  p: number;
  @jsonMember({constructor: Number})
  g: number;
  @jsonMember({constructor: Number})
  y: number;
}

@jsonObject
export class Option {
  @jsonMember({constructor: Number})
  number: number;
  @jsonMember({constructor: String})
  option: string;
}

@jsonObject
export class Question {
  @jsonMember({constructor: String})
  desc: string;
  @jsonArrayMember(Option)
  options: Option[];
}

@jsonObject
export class Voting {
  @jsonMember({constructor: Number})
  id: number;
  @jsonMember({constructor: String})
  name: string;
  @jsonMember({constructor: String})
  desc: string;
  @jsonMember({constructor: Question})
  question: Question;
  @jsonMember({constructor: Date})
    // tslint:disable-next-line:variable-name
  start_date: Date;
  @jsonMember({constructor: Date})
    // tslint:disable-next-line:variable-name
  end_date: Date;
  @jsonMember({constructor: PubKey})
    // tslint:disable-next-line:variable-name
  pub_key: PubKey;
  @jsonArrayMember(Auth)
  auths: Auth[];
  @jsonMember({constructor: Object})
  tally: null;
  @jsonMember({constructor: Object})
  postproc: null;
}
