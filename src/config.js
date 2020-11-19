const HTTP = process.env.HTTP;
const DOMAIN = process.env.DOMAIN;
console.log('HTTP', HTTP);
console.log('DOMAIN', DOMAIN);

export const API = {
  QUESTION: `${HTTP}${DOMAIN}/api/question`,
  FEEDBACK: `${HTTP}${DOMAIN}/api/feedback`,
};
