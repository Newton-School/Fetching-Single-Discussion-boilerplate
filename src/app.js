const fs = require("fs");
const express = require("express");
const app = express();

// Importing discussions from discussions.json file
const discussions = JSON.parse(fs.readFileSync(`data/discussions.json`));

// Middlewares
app.use(express.json());


app.get("/api/v1/discussions", (req, res) => {

    res.status(200).json({
        status: "Success",
        message: "Discussions fetched successfully",
        data: {
          discussions,
        },
      });

});

// Write GET endpoint for getting discussion

/*

Endpoint - /api/v1/discussions/:id

1. id will be given in api params.
2. Get discussion with given id.


Response ==> 

1. Success
Return 200 Status code
json = {
        status: "Success",
        data: obj
      }

2. Discussion with given id not found

Return 404 Status code
json = {
  status: "Failed",
  message: "Discussion not found!",
}

*/

app.get("/api/v1/discussions/:id", (req, res) => {

  //Write your code here.

});



app.post("/api/v1/discussions", (req, res) => {

  var obj = req.body;
  obj['id'] = (discussions[discussions.length-1].id)+1;
  discussions.push(obj);

  fs.writeFile(
    `data/discussions.json`,
    JSON.stringify(discussions),
    (err) => {
      res.status(200).json({
        status: "Success",
        message: "Discussions added successfully"
      })
    }
  );

});

app.patch("/api/v1/discussions/:id", (req, res) => {

  const id = req.params.id * 1;
  const updatedDetails = discussions.find(
    (updatedDetails) => updatedDetails.id === id
  );

  const index = discussions.indexOf(updatedDetails);

  if (!updatedDetails) {
    return res.status(404).send({
      status: "Failed",
      message: "Discussion not found!",
    });
  }

  Object.assign(updatedDetails, req.body);

  fs.writeFile(
    `data/discussions.json`,
    JSON.stringify(discussions),
    (err) => {
      res.status(200).json({
        status: "Success",
        message: `Discussions Updated Successfully`
      });
    }
  );
});


app.delete("/api/v1/discussions/:id", (req, res) => {
  const id = req.params.id * 1;
  const userDetailToDelete = discussions.find(
    (detailTODelete) => detailTODelete.id === id
  );
  if (!userDetailToDelete) {
    return res.status(404).send({
      status: `Failed`,
      message: `Discussion not found!`,
    });
  }
  const index = discussions.indexOf(userDetailToDelete);
  discussions.splice(index, 1);
  fs.writeFile(
    `data/discussions.json`,
    JSON.stringify(discussions),
    (err) => {
      res.status(200).json({
        status: `Success`,
        message: `Discussions Deleted Successfully`
      });
    }
  );
});


module.exports = app;