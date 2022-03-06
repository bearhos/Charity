const Help = require("../models/Help");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/",  async (req, res) => {
  const newHelp = new Help(req.body);

  try {
    const savedHelp = await newHelp.save();
    res.status(200).json(savedHelp);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedHelp = await Help.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHelp);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Help.findByIdAndDelete(req.params.id);
    res.status(200).json("Help has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER Helps
router.get("/find/:id",  async (req, res) => {
  try {
    const Help = await Help.findById(req.params.id);
    res.status(200).json(Help);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/",  async (req, res) => {
  const qNew = req.query.new;
  try {
    let Helps;

    if (qNew) {
      Helps = await Help.find().sort({ createdAt: -1 }).limit(100);}
    else {
      Helps = await Help.find();
    }
    res.status(200).json(Helps);
  }
   catch (err) {
    res.status(500).json(err);
  }
});

// GET Year INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastYear = new Date(date.setYear(date.getYear() - 1));
  const previousYear = new Date(new Date().setYear(lastYear.getYear() - 1));

  try {
    const income = await Help.aggregate([
      {
        $match: {
          createdAt: { $gte: previousYear },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          year: { $year: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$year",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
