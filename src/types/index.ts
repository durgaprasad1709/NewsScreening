export interface SearchFormData {
  name: string;
  country: string;
  domain: string;
  fromDate: Date;
  endDate: Date;
  numberOfURLs: string;
  key?: string;
  articles?: Article[];
}

export interface Article {
  title: string;
  date: string;
  link: string;
  summary: string;
  sentiment: string;
  keywords: string[];
  domain?: boolean;
}

export interface EntityData {
  entityInfo: SearchFormData;
  articles?: Article[];
}
