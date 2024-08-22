import express from "express"
import { overviews } from "./data/overviews-data.js"
import bodyParser from "body-parser";
import { mainPicture }from "./data/main-picture.js";
import { quotes } from "./data/quotes.js";
import {gallery} from "./data/gallery_data.js"


const data = overviews;
const quotesData = quotes;

const app=express()
const port=3000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, ()=>{
    console.log(`app running on port ${port}`)
})

app.get("/", (req, res) => {
    const randomPictureIndex = Math.floor(Math.random()*mainPicture.length);
    const randomPicture = mainPicture[randomPictureIndex].src;
    const randomQuoteIndex = Math.floor(Math.random()*quotesData.length);
    const randomQuote = quotesData[randomQuoteIndex];
    console.log(randomPicture);
    console.log(quotesData.length);
    res.render('index.ejs', {
                        data:data,
                        randomPicture:randomPicture,
                        randomQuote: randomQuote,
                        //allQuotes:quotesData,
                    })
})

app.get("/sort", (req, res) => {
    const requestedType = req.query.type;
    let title = '';
    let sortData = {};

    if(requestedType === 'tipy_na_vylety'){
        title = 'Tipy na výlety';
        sortData = data.filter((data)=>data.cathegory.name === 'Tipy na výlety')
    }
    else if(requestedType === 'vzkazy_v_lahvi'){
        title = 'Vzkazy v láhvi';
        sortData = data.filter((data)=>data.cathegory.name === 'Vzkazy v láhvi'); 
    }
    res.render('sort_articles.ejs', {
                        title: title,
                        data:sortData,
                    })
})

app.get("/gallery", (req, res) => {
    const galleryData = gallery;
    console.log(gallery)
    res.render('gallery.ejs', {galleryData: galleryData});
})


app.get("/about", (req, res) => {
    res.render('about.ejs')
})

app.get("/article", (req, res) => {
    console.log(req.query.id);
    let requestedArticle;
    
    overviews.forEach((article) => {
        if(article.articleId === req.query.id){
            requestedArticle = article;
        }
    })
    res.render("article.ejs", {articleData: requestedArticle})
})

app.get("/requestGallery", (req, res) => {
    console.log(req.query.name)
    const chosenGallery = gallery.filter(gallery => gallery.galleryName===req.query.name)
    console.log(chosenGallery[0])
    res.render('chosenGallery.ejs',{
        galleryData:chosenGallery[0].galleryData,
        galleryName:req.query.name,
    })
})