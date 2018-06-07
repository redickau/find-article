# Redi Read Research
A node script to find research articles.

# Installation
In order to run the script, please make sure you have [NodeJS](https://nodejs.org/en/) and [NPM](https://docs.npmjs.com/getting-started/installing-node) installed by typing nthe following in a command prompt:
```
$ node -v // returns version number for NodeJS
$ npm -v // returns version number for NPM
```

Next, clone the `redi-research` repository and run the following command to install the necessary dependencies:
```
$ npm install
```

# Usage
Run the scruipt using the following command to search the [DOAJ](https://doaj.org/) for articles. One page of results is returned at a time. A maximum of 10 articles will display per page by default.
```
$ node redi-research
```

### Arguments
Various flags can be set for each search:

|Flag|Required|Default|Description|
|----|--------|-------|-----------|
|`-q`, `--query`|`true`|`"hello world"`|`specify string search parameter`|
|`-p`, `--page`|`false`|`1`|`specify which page of results to search for`|
|`-s`, `--page-size`|`false`|`10`|`specify number of articles per page (max 100)`|
|`-l`, `--language`|`false`|`null`|`specify string language identifier`|

### Examples
Using the `--query` flag:
```
$ node redi-research -q "siren songs"
$ node redi-research -q "title:siren songs"
$ node redi-research -q "abstract:siren songs"
$ node redi-research -q "issn:0214-8358"
$ node redi-research -q "id:4e805242045459a9199d91ed7f040c4"
$ node redi-research -q "doi:10.3989/scimar.03575.20A"
```

Using the `--language` flag:
```
$ node redi-research -l "EN"
$ node redi-research -l "ES"
$ node redi-research -l "FR"
$ node redi-research -l "DE"
$ node redi-research -l "RU"
```

Using the `--page-size` flag:
```
$ node redi-research -q "chess" -s 15
$ node redi-research -q "soccer" -s 100
```

Combining flags:
```
$ node redi-research -q "hello world" -p 2
$ node redi-research --query "chess" --page-size 100
$ node redi-research --query "siren songs" -l ES
```
