const Donor = require("../models/Donor");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newDonor = new Donor(req.body);

  try {
    const savedDonor = await newDonor.save();
    res.status(200).json(savedDonor);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedDonor = await Donor.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedDonor);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Donor.findByIdAndDelete(req.params.id);
    res.status(200).json("Donor has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER Donors
router.get("/find/:id",  async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    res.status(200).json(donor);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/",  async (req, res) => {
  const qNew = req.query.new;
  try {
    let donors;

    if (qNew) {
      donors = await Donor.find().sort({ createdAt: -1 }).limit(100);}
    else {
      donors = await Donor.find();
    }
    res.status(200).json(donors);
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
    const income = await Donor.aggregate([
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
