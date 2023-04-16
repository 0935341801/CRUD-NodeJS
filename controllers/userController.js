import User from "../model/user.js";

export const createUser = async (req, res) => {
  try {
    const { name, age } = req.body;
    const newUser = await User.create({
      name,
      age,
    });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUser = async (req, res) => {
  try {
    const listUser = await User.find();
    console.log(req.query);
    const {name, age} = req.query
    
    console.log(name,age)
    res.status(200).json(listUser);
  } catch (err) {
    res.status(500).json(err);
  } 
  
};



export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id
    const deleteUser = await User.findByIdAndDelete(id)
    res.send(deleteUser)
  } catch (error){
    res.status(500).json(error);
  }
};

export const updateUser = async(req,res,next) => {
  try{
    const id = req.params.id
    const name = req.body
    const updateUser = await User.findByIdAndUpdate(id,name)
    res.send(updateUser)
  }catch (error){
    res.send({ "error": error.message })
  }
}

export const searchUser = async(req,res) => {
  try{
    const data = req.query.name
    console.log(data,'name');
    const searchUser = await User.find({"name" : { $regex: data, $options: 'i' } },)
    res.send(searchUser)
  }catch(error) {
    res.send({"error":error.message})
  }
}

export const Paginate = async(req, res) => {
  try {
    const activePage = parseInt(req.query.activePage)
    console.log(activePage,'day la activePage')
    let limit = parseInt(req.query.limit)
    console.log(limit,'day la limit ')
    const skip = (activePage - 1) * limit
    const totalDocument = await User.countDocuments({})
    console.log(totalDocument,'day la total document')
    const totalPages = Math.ceil(totalDocument / limit)
    const listUser = await User.find().skip(skip).limit(limit)
    res.status(200).json({activePage,limit,totalDocument,totalPages,listUser});
    
  }catch(error){
    res.send({"error": error.message})
  }
}

