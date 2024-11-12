export interface SearchFormData {
  name: string;
  country: string;
  start_date: string;
  end_date: string;
  numberOfURLs: string;
  flag: 'POI' | 'Entity';
  domain: string[];
  company?: string;
}

export interface Article {
  title: string;
  date: string;
  link: string;
  summary: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  keywords: string[];
  domain?: boolean;
}

export interface EntityData {
  entityInfo: SearchFormData;
  articles?: Article[];
}

export interface ArticleData {
  title: string;
  date: string;
  link: string;
  full_article: string;
  summary: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  keywords: string[];
}

export interface KeywordData {
  keyword: string;
  'keyword-type': 'entity' | 'Person' | 'General-Keyword';
  searchable: boolean;
  count: number;
  sizing_score: number;
}

export interface JsonResponse {
  entityInfo: SearchFormData;
  articles: ArticleData[];
  'keywords-data-agg': KeywordData[];
}
