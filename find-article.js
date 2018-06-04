const commander = require("commander");
const readline = require("readline");
const request = require("request");

const arrayOfArticles = [];

commander
    .version("0.0.1")
    .option("-q, --query <query>", "query text as string", "hello world")
    .option("-m, --max-results [maxResults]", "maximum number of results per page", 10)
    .option("-l, --language [language]", "filters results by specified language", "all")
    .parse(process.argv)

request(`https://doaj.org/api/v1/search/articles/${commander.query}?pageSize=${commander.maxResults}`, (error, response, body) => {
    if (error) throw error;

    const resultObj = JSON.parse(body);
    const resultArr = resultObj.results;

    console.log("Results:");
    console.log("--------");
    resultArr.forEach((currentArticle, index) => {
        const articleObj = {};
        articleObj.id = currentArticle.id;
        articleObj.title = currentArticle.bibjson.title;
        articleObj.link = getLinkToFullArticle(currentArticle);

        console.log(`\nArtical #${index + 1}`);
        console.log(articleObj);
    });
});

function getLinkToFullArticle(article) {
    const urls = [];
    const articleLinkArr = article.bibjson.link;
    if (articleLinkArr) {
        articleLinkArr.forEach(linkObj => {
            urls.push(linkObj.url);
        });
    }

    return urls;
}