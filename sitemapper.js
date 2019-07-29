require('babel-register');
 
const router = require('./src/Routes').default;
const Sitemap = require('react-router-sitemap').default;
 
(
    new Sitemap(router)
        .build('http://my-site.ru')
        .save('./sitemap.xml')
);