import { Article                } from './Article'
import { ArticleController      } from './ArticleController'
console.log(
    'The article.js module has loaded! See the network tab in dev tools...'
);
export default () => {
    // compose tag figure
    const articleId = "a-" + $SR.uuidv4();
    let article = new Article(articleId);
    document.body.appendChild(article);
    // insert controller
    $SR.setModelById(articleId).inject(ArticleController, {});
};