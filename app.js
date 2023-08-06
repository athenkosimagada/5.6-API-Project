import express from "express";
import bodyParser from "body-parser";
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3000;
const API_KEY = "8f47dcf64ad53b6eb75d5fec466e6ae0";
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie';
const API_URL2 = BASE_URL + '/discover/movie?sort_by=id.desc&';
const SEARCH_URL = BASE_URL + "/search/movie";
const yourBearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjQ3ZGNmNjRhZDUzYjZlYjc1ZDVmZWM0NjZlNmFlMCIsInN1YiI6IjY0Y2U3MmNlNTQ5ZGRhMDBmZmEzYjA1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3tuomSM9MsN1zz8FWpfVA7hCd1gd3hVilYVH5CfR8gk';
const config = {
    headers: { Authorization: `Bearer ${yourBearerToken}` },
  };

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(API_URL, config);
        const responseTwo = await axios.get(API_URL2, config);
        const result = response.data;
        const resultTwo = responseTwo.data;
        res.render("index.ejs", { 
          items: result.results, 
          items2:  resultTwo.results,
        });
      } catch (error) {
        res.render("index.ejs", {
            error: error.message,
          });
      }
});

app.post("/", async (req, res) => {

    const searchTerm = req.body["search"];
    console.log(searchTerm);
    try {
        const response = await axios.get(SEARCH_URL, {
            params: {
                query: searchTerm,
            },
            headers: config.headers,
        });
        const result = response.data;
        res.render("index.ejs", { items: result.results });
      } catch (error) {
        res.render("index.ejs", {
            error: error.message,
          });
      }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});