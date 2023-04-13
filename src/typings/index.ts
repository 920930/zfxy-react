interface IBase {
  id: number;
  name: string;
  phone: string;
  state: number;
  createdAt: string;
}

export interface IAdminer extends IBase {
  avatar: string;
  users: IUser[];
  notes: INote[];
  userCount?: number;
  noteCount?: number;
}

export interface IUser extends IBase {
  desc: string;
  trade?: ITrade;
  adminer?: IAdminer;
}

export interface INote extends Omit<IBase, 'name' | 'phone'> {
  content: string;
  user: Pick<IUser, 'id' | 'name' | 'state'>;
  adminer: Pick<IAdminer, 'id' | 'name'>;
}

export interface ITrade extends Omit<IBase, 'phone'> {

}

export type TMe = Omit<IAdminer, 'users' | 'notes'>

export interface IList<T> {
  count: number;
  rows: T[]
}