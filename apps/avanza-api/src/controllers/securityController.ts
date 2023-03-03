import {
  Article,
  ForumPost,
  SecurityService,
} from '../services/security/securityService';

const securityService = new SecurityService();

export const getSecurityById = (req, res, next) => {
  const securityId = req.params.securityId;

  Promise.all([
    securityService.getSecurityById(securityId),
    securityService.getSecurityNews(securityId),
    securityService.getSecurityForumsPosts(securityId),
  ]).then(([details, news, forum]) =>
    res.send({
      ...details,
      news: news.sort((a, b) => a.timePublishedMillis - b.timePublishedMillis),
      forum: forum.sort((a, b) => a.timestamp - b.timestamp),
    })
  );
};
