import { Article                } from './Article'
import { ArticleController      } from './ArticleController'
console.log(
    'The article.js module has loaded! See the network tab in dev tools...'
);
export default () => {
    // compose tag figure
    let article = new Article('editor');
    document.body.appendChild(article);
    // insert controller
    $SR.registerFrame(article).inject(ArticleController, {});
};