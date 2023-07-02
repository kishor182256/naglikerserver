import Collector from "../../model/collector/collector.js";



export const registerCollector = async (req, res) => {
    const { name, phone, email, location, status } = req.body;
  
    try {
      const userExists = await Collector.findOne({ email: email });
  
      if (userExists) {
        return res.json({ errors: "Collector already Registered" });
      } else {
        const collector = await new Collector({
          name,
          location,
          phone,
          email,
          status,
        }).save();
  
        return res.json({
          collector,
        });
      }
    } catch (err) {
      console.error("Register Api Error", err);
      res.json({ error: err });
    }
  };
  
  export const getcollectorList = async (req, res) => {
    try {
      const collector = await Collector.find().populate("patience");
      return res.json({
        collector,
      });
    } catch (err) {
      console.error("Fecthing  Api Error", err);
      res.json({ error: err });
    }
  };
  
  export const getsinglecollector = async (req, res) => {
    try {
      const collector = req.params._id;
  
      const singlecollector = await Collector.findOne(collector);
      return res.json({
        singlecollector,
      });
    } catch (err) {
      console.error("Fecthing  Api Error", err);
      res.json({ error: err });
    }
  };
  
  export const deleteCollector = async (req, res) => {
    try {
      const collector = req.params._id;
      const collectors = await Collector.findOneAndRemove(collector);
      return res.json({
        message: "Collector removed successfully",
      });
    } catch (err) {
      console.error("Deleting collector  Api Error", err);
      res.json({ error: err });
    }
  };
  
  export const editCollector = async (req, res) => {
    try {
      const collector = req.params._id;
      const updatedCollector = await Collector.findOneAndUpdate(
        { collector },
        req.body,
        { new: true }
      ).exec();
      return res.json({
        updatedCollector,
      });
    } catch (err) {
      console.error("Updating collector  Api Error", err);
      res.json({ error: err });
    }
  };
  