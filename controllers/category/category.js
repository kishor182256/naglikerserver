import TestCategory from "../../model/masterdata/testCategory.js";
import TestSubcategory from "../../model/masterdata/testSubcategory.js";




export const addCategory = async (req, res) => {
    const { name, prefix, suffix, lastnumber } = req.body;
  
    try {
      const testCategory = new TestCategory({ name, prefix, suffix, lastnumber });
      const existingCategory = await TestCategory.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category with the same name already exists" });
    }else{
      const savedTestCategory = await testCategory.save();
      res.status(201).json({message: "Test category saved",savedTestCategory});
    }
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error in saving Category" });
    }
  };
  
  export const getCategory = async (req, res) => {
    try {
      const testCategory = await TestCategory.findById(req.params.id).populate(
        "subcategories"
      );
      return res.json({
        testCategory,
      });
    } catch (err) {
      console.error("Fecthing  Api Error", err);
      res.json({ error: err });
    }
  };

  export const getAllTestCategory = async (req, res) => {
    try {
      const testCategory = await TestCategory.find().populate(
        "subcategories"
      );
      return res.json({
        testCategory,
      });
    } catch (err) {
      console.error("Fecthing  Api Error", err);
      res.json({ error: err });
    }
  };
  
  export const deleteTestCategory = async (req, res) => {
    try {
      const test = req.params._id;
      await TestCategory.findOneAndRemove(test);
      return res.json({
        message: "Test  removed successfully",
      });
    } catch (err) {
      console.error("Deleting  Api Error", err);
      res.json({ error: err });
    }
  };

  export const deleteTestSubCategory = async (req, res) => {
    try {
      const test = req.params._id;
      await TestSubcategory.findOneAndRemove(test);
      return res.json({
        message: "Test  removed successfully",
      });
    } catch (err) {
      console.error("Deleting  Api Error", err);
      res.json({ error: err });
    }
  };
  
  export const editTestCategory = async (req, res) => {
    try {
      const id = req.params._id;
      const updatedtest = await TestCategory.findOneAndUpdate({ id }, req.body, {
        new: true,
      }).exec();
      return res.json({
        updatedtest,
      });
    } catch (err) {
      console.error("UpdateTest  Api Error", err);
      res.json({ error: err });
    }
  };
  
  export const getAllCategory = async (req, res) => {
    try {
      const page = parseInt(req.params.page) || 1; 
      const limit = parseInt(req.params.limit) || 10; 
  
      const count = await TestSubcategory.countDocuments();
  
      const totalPages = Math.ceil(count / limit); 
      const offset = (page - 1) * limit;
      const testCategory = await TestCategory.find().skip(offset)
      .limit(limit).populate("subcategories");
      return res.json({
        testCategory,
        totalPages,
        currentPage: page,
        totalItems: count
      });
    } catch (err) {
      console.error("Fecthing  Api Error", err);
      res.json({ error: err });
    }
  };
  
  export const addSubCategory = async (req, res) => {
    
     
    const category = req.body.testdata.category;
    const id = req.body.testdata.testid;
    const units = req.body.testdata.unit;
    const normalValue = req.body.testdata.normal;
    const name = req.body.testdata.testname;
    const tatinMinute = req.body.testdata.tat;
    const deltaLimit = req.body.testdata.deltalimit;
    const deltaCheckTime = req.body.testdata.deltime;
    const defaultValue = req.body.testdata.rangeForFeMale;
  
    const rangeForMale =req.body.formFields;
    const rangeForFemale =req.body.FemaleformFields;
    const options = req.body.optionFields;
    // console.log("addtestCategorysubcategories", req.body.formFields); 
    console.log("req.body.testdata.deltime", options);
  
    
  
    
  
    try {
      const testCategory = await TestCategory.findById(
        req.body.testdata.category
      );
  
      if (!testCategory) {
        return res.status(400).json({ message: "Invalid subcategory ID" });
      }
  
      const subTestCategory = new TestSubcategory({
        name,
        id,
        units,
        normalValue,
        // defaultValue,
        tatinMinute,
        deltaLimit,
        deltaCheckTime,
        rangeForMale,
        rangeForFemale,
        category,
        options,
      });
      // testCategory.subcategories.push(subTestCategory);
      const savedSubTestCategory = await subTestCategory.save();
      // await testCategory.save();
  
      res.status(201).json({message:"Test Subcategory saved successfully",savedSubTestCategory});
    } catch (err) {
      console.error(err);
      res.status(500).json({message:"Error saving test Category"});
    }
  };
  
  export const addSubCategoryPrice = async (req, res) => {
    const testId = req.body.status;
    const subtestId = req.body.subid;
    console.log("Fecthing subtestId  Api", req.body.status);
  
    try {
      const test = await TestSubcategory.findById(req.body.subid);
      if (test) {
        const updatedprice = await TestSubcategory.findByIdAndUpdate(
          { _id: req.body.subid },
          { $set: { Rate: req.body.rate,
            category: req.body.status,
            collect: req.body.collect,
            shortname: req.body.shortname,
            pricelist:req.body.pricelist,
            account: req.body.account} },
          {
            new: true,
          }
        );
        console.error("Error", updatedprice.Rate);
        res.status(201).json(updatedprice);
      } else {
        res.json({ message: "No test found" });
      }
    } catch (err) {
      console.error("Error", err);
      res.json({ error: err });
    }
  };
  
  export const getsubCategory = async (req, res) => {

    try {
      const page = parseInt(req.params.page) || 1; 
      const limit = parseInt(req.params.limit) || 10; 
  
      const count = await TestSubcategory.countDocuments();
  
      const totalPages = Math.ceil(count / limit); 
      const offset = (page - 1) * limit; 
  
      const subTestCategory = await TestSubcategory.find()
        .populate("category")
        .skip(offset)
        .limit(limit);
  
      return res.json({
        subTestCategory,
        totalPages,
        currentPage: page,
        totalItems: count
      });
    } catch (err) {
      console.error("Fetching API Error", err);
      res.json({ error: err });
    }
  };
  


  export const getAllsubCategory = async (req, res) => {

    try {
      const page = parseInt(req.params.page) || 1; 
      const limit = parseInt(req.params.limit) || 10; 
  
      const count = await TestSubcategory.countDocuments();
  
      const totalPages = Math.ceil(count / limit); 
      const offset = (page - 1) * limit; 
  
      const subTestCategory = await TestSubcategory.find()
        .populate("category")
        .skip(offset)
        .limit(limit);
  
      return res.json({
        subTestCategory,
        totalPages,
        currentPage: page,
        totalItems: count
      });
    } catch (err) {
      console.error("Fetching API Error", err);
      res.json({ error: err });
    }
  };
  