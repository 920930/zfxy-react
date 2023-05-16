interface IBase {
  id: number;
  name: string;
  phone: string;
  state: number;
  createdAt: string;
  updatedAt: string;
}

export interface IAdminer extends IBase {
  avatar: string;
  roleId: number;
  users: IUser[];
  notes: INote[];
  userCount?: number;
  noteCount?: number;
}

export interface IUser extends IBase {
  desc: string;
  sex: boolean;
  address: string;
  area: string;
  timer: string;
  trade?: TTrade;
  adminer?: IAdminer;
  markets?: { id: number; name: string }[];
  adminerId: number;
  tradeId: number;
}

export interface INote extends Omit<IBase, 'name' | 'phone'> {
  content: string;
  user: Pick<IUser, 'id' | 'name' | 'state'>;
  adminer: Pick<IAdminer, 'id' | 'name'>;
}

export type TTrade = Pick<IBase, 'id' | 'name' | 'state'>
export interface ITrade extends Omit<IBase, 'phone'> { }

export type TMe = Omit<IAdminer, 'users' | 'notes'>

export interface IList<T> {
  count: number;
  rows: T[]
}
