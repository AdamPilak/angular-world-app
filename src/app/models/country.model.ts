export interface Country {
  flags: Flags;
  name: Name;
  translations: Translations
}

export interface Flags {
  png: string;
  svg: string;
  alt: string;
}

export interface Name {
  common: string;
  official: string;
}

export interface Translations {
    ara: Name;
    bre: Name;
    ces: Name;
    cym: Name;
    deu: Name;
    est: Name;
    fin: Name;
    fra: Name;
    hrv: Name;
    hun: Name;
    ita: Name;
    jpn: Name;
    kor: Name;
    nld: Name;
    per: Name;
    pol: Name;
    por: Name;
    rus: Name;
    slk: Name;
    spa: Name;
    srp: Name;
    swe: Name;
    tur: Name;
    urd: Name;
    zho: Name;
}
