const express = require("express");

const https = require("https"); //hold of the http module
// const request = require("request");//--> error ave 6e
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// need to catch it using the app post method
app.post("/", function (req, res) {
  console.log("city nu name is : "+req.body.cityName);
  console.log("Tamari post amne madi gayii 6e ");

/*pehla no badho code ->  */

const query =req.body.cityName;
const apiKey = "1e1ba23e82403580524ed489d3ac3d59";
const unit = "metric";
const url =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  query +
  "&units=" +
  unit +
  "&appid=" +
  apiKey;
https.get(url, function (response) {
//   console.log("To fetch the data: " + response.statusCode);
//   console.log(
//     "To status code associated with the response : " + response.statusCode
//   );
  /*when we receive some data  */
  response.on("data", function (data) {
    // console.log(data);
    const weatherData = JSON.parse(data);
    console.log("weatherData: " + weatherData);
    // console.log("(jyare aa aevu kaik text ni jode avse ne tyare ae hexadecimal ma nahi ave --> yadd 6e java ma datatypes compatibale thai jata hata )je https ne response karva par data mukelo 6e ne ae --> "+data);

    //   const object={
    //     name:"Angela",
    //     favouriteFood:"Ramen"
    //   }
    //   console.log(JSON.stringify(object));
    const temp = weatherData.main.temp;
    // console.log("The temp is : "+temp);
    const temp2 = weatherData.wind;
    //   console.log("wind  like -> "+temp2);
    //   console.log("name-> "+weatherData.name);

    //   console.log("description-> "+weatherData.weather[0].description);
    // res.send("<h1>The temperature in london is  : "+temp+ " degrees Celsius .</h1>");
    // const image ="https://openweathermap.org/img/wn/"+wthrIcon+"@2x.png";
    const wthrDescp = weatherData.weather[0].description;
    const wthrIcon = weatherData.weather[0].icon;
    res.send(
      "<h1>The weather description  in "+query+"is  : " +
        wthrDescp +
        " </h1>" +
        "<img src=" +
        "https://openweathermap.org/img/wn/" +
        wthrIcon +
        "@2x.png" +
        "> "
    );
    // res.write("<h1>The weather description  in london is  : "+wthrDescp+" </h1>");
    // res.send("<h1>The weather description  in "+query +"is  : "+wthrDescp+" </h1>"+ "<img src="+image+">");
    // res.send("hello");
  });
});

//   res.send("Server chale 6ee");






});
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

app.listen(port, function () {
  console.log("Example of the port listeninig");
});
