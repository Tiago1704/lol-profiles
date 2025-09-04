export interface DataPersona {
    name: string;
    lastname: string;
    email: string;
    userlol: string;
    password: string;
    line?: string;
    secondLine?: string;
    champs?: string[];
    wins: number;
    photoProfile?: any;
}

export interface Evento {
    id: string;
    idType: string;
    title: string;
    start: Date;
    end: Date;
    participantes?: string[];
}

export interface EventType {
    id: string;
    jugadoresPorEquipo: number;
    mapa: string;
    reglas: string[]
}

export interface EventoVM {
    id: string;
    title: string;
    start: string;
    end: string;
    jugadoresPorEquipo: number;
    mapa: string;
    reglas: string[]
}

interface Equipo {
  capitan: string;
  jugadores: string[];
}
export interface Torneo {
  id: string;
  capitanes: string[];
  equipos: Equipo[];
  ganador: string;
}

export interface Champion {
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  tags: string[];
  partype: string;
  stats: {
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    movespeed: number;
    armor: number;
    armorperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    attackrange: number;
    hpregen: number;
    hpregenperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    crit: number;
    critperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackspeedperlevel: number;
    attackspeed: number;
  };
}
