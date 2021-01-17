import {jsonArrayMember, jsonMember, jsonObject} from 'typedjson';

@jsonObject
export class Auth {
  @jsonMember({constructor: String})
  name: string;
  @jsonMember({constructor: String})
  url: string;
  @jsonMember({constructor: Boolean})
  me: boolean;
  constructor(name: string, url: string, me: boolean){}
}

@jsonObject
export class PubKey {
  @jsonMember({constructor: Number})
  p: number;
  @jsonMember({constructor: Number})
  g: number;
  @jsonMember({constructor: Number})
  y: number;
  constructor(p: number, g: number, y: number){}
}

@jsonObject
export class Option {
  @jsonMember({constructor: Number})
  number: number;
  @jsonMember({constructor: String})
  option: string;
  // tslint:disable-next-line:variable-name
  constructor(number: number, option: string){}
}

@jsonObject
export class Question {
  @jsonMember({constructor: String})
  desc: string;
  @jsonArrayMember(Option)
  options: Option[];
  constructor(desc: string, options: Option[]){}
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
  // tslint:disable-next-line:variable-name
  constructor(id: number, name: string, desc: string, question: Question, start_date: Date, end_date: Date, pub_key: PubKey,
              auths: Auth[], tally: null, postproc: null){}
}
