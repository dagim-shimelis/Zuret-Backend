const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//Get All Tours
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    result: tours.length,
    data: tours,
  });
});

//Get a Tour by ID
app.get("/api/v1/tours/:id", (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: tour,
  });
});

  //Create a Tour
app.post("/api/v1/tours", (req, res) => {
  const newId = tours.length;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: newTour,
      });
    }
  );
});

  //Update Tours by ID
app.patch("/api/v1/tours/:id", (req, res) => {
    const id = req.params.id * 1;
  
    if (!tour) {
      res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }
  
    res.status(200).json({
      status: "success",
      message: "< UPDATE tour here >",
    });
  });

  //Delete Tours by ID
  app.delete("/api/v1/tours/:id", (req, res) => {
    const id = req.params.id * 1;
  
    if (!tour) {
      res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }
  
    res.status(200).json({
      status: "success",
      message: "< DELETE tour here >",
    });
  });

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
