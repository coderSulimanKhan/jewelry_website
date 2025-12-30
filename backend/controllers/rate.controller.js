import Rate from "../models/rate.model.js"

const updateRate = async (req, res) => {
  console.log(req.body);
  try {
    if (!req?.body?.rate) {
      res.status(400).json({ success: false, message: "Rate is not defined" });
    }
    const rate = await Rate.create({ gold_t: req?.body?.rate });
    if (!rate) return res.status(400).json({ success: false, message: "Failed to update rate" });
    res.status(200).json({ success: true, message: "Rate updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getRate = async (req, res) => {
  try {
    const rate = await Rate.find();
    if (!rate) return res.status(404).json({ success: false, message: "Rate not found" });
    console.log(rate);
    res.status(200).json({ success: true, data: rate[rate.length - 1]?.gold_t });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export { updateRate, getRate };