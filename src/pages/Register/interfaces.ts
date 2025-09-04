export enum Elo {
  IRON = 'Iron',
  BRONZE = 'Bronze',
  SILVER = 'Silver',
  GOLD = 'Gold',
  PLATINUM = 'Platinum',
  EMERALD = 'Emerald',
  DIAMOND = 'Diamond',
  MASTER = 'Master',
  GRANDMASTER = 'Grandmaster',
  CHALLENGER = 'Challenger',
}

export enum Division {
  ONE = 'One',
  TWO = 'Two',
  THREE = 'Three',
  FOUR = 'Four',
}

export enum Lane {
  TOP = 'Top',
  JUNGLE = 'Jungle',
  MID = 'Mid',
  ADC = 'ADC',
  SUPPORT = 'Support',
}

export interface IUser {
  id?: string;
  username: string;
  email: string;
  password: string;
  lolNickname: string;
  tag: string;
  elo?: Elo;
  division?: Division;
  mainChamps?: string[];
  preferredLane?: Lane;
  createdAt?: Date;
  confirmPassword?: string;
}
