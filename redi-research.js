const commander = require("commander");
const readline = require("readline");
const request = require("request");

const arrayOfArticles = [];
commander
    .version(require('./package.json').version)
    .option("-q, --query <query>", "query text as string", "hello world")
    .option("-m, --max-results [maxResults]", "maximum number of results per page", 10)
    .option("-p, --page-num [pageNum]", "specify which page of results to display", 1)
    .option("-l, --language [language]", "filters page results by specified language", "all")
    .parse(process.argv)

request(`https://doaj.org/api/v1/search/articles/${commander.query}?page=${commander.pageNum}&pageSize=${commander.maxResults}`, (error, response, body) => {
    if (error) throw error;
    const resultObj = JSON.parse(body);
    const resultArr = resultObj.results;

    console.log(`\nPage ${commander.pageNum} Results:`);
    console.log("-----------------");
    resultArr.forEach((currentArticle, index) => {
        const articleObj = {};
        const articleNum = commander.maxResults * (commander.pageNum - 1) + (index + 1);

        articleObj.id = currentArticle.id;
        articleObj.author = getAllAuthors(currentArticle);
        articleObj.title = currentArticle.bibjson.title;
        articleObj.link = getAllUrls(currentArticle);

        arrayOfArticles.push(articleObj);
        console.log(`Article #${articleNum}`);
        console.log("", articleObj, "\n");
    });
    console.log(`End of Page ${commander.pageNum}`);
});

function getAllAuthors(article) {
    const authors = [];
    if (article.bibjson.author) {
        article.bibjson.author.forEach(authorObj => {
            authors.push(authorObj.name);
        });
    }
    return authors;
}

function getAllUrls(article) {
    const urls = [];
    if (article.bibjson.link) {
        article.bibjson.link.forEach(linkObj => {
            urls.push(linkObj.url);
        });
    }
    return urls;
}