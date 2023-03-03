
import { InstrumentType } from '../../models/InstrumentType';
import { AvanzaService } from '../auth/avanzaService';

export class SecurityService {
  private avanza = AvanzaService.getInstance().avanza;

  getSecurityById = (securityId: string) => {
    return this.avanza
      .getInstrument(InstrumentType.STOCK, securityId)
      .then((res) => res);
  };
  getSecurityNews = (securityId: string): Promise<Article[]> => {
    return this.avanza
      .getInstrumentNews(securityId)
      .then((res: News) => res.articles)
  };
  getSecurityForumsPosts = (securityId: string): Promise<ForumPost[]> => {
    return this.avanza
      .getInstrumentForum(securityId)
      .then((res: Forum) => res.posts)
      .catch(err => err)
  };

}



interface News {
  articles:     Article[];
  moreNewsLink: string;
}

export interface Article {
  timePublishedMillis: number;
  timePublished:       Date;
  headline:            string;
  vignette:            string;
  articleType:         ArticleType;
  newsSource:          string;
  fullArticleLink:     string;
  intro:               string;
  externalLink:        boolean;
}

enum ArticleType {
  Analys = "Analys",
  Kommentar = "Kommentar",
  Nyhet = "Nyhet",
  Pressrelease = "Pressrelease",
  Telegram = "Telegram",
  Övrigt = "Övrigt",
}

interface Forum {
  url:   string;
  posts: ForumPost[];
}

export interface ForumPost {
  author:    string;
  title:     string;
  content:   string;
  likes:     number;
  replies:   number;
  timestamp: number;
  url:       string;
}