const {check,validationResult} = require('express-validator');

exports.validateRegisterUser = () => {
  return [ 
    check('name', 'Tên không được để trống!!').not().isEmpty(),
    check('email')
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    .withMessage('Sai định dạng email'),
    check('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .withMessage('Password tối thiểu 8 kí tự,gồm chữ và số,kí tự hoa')
   
  ]; 
}

exports.validate = (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array().map(err=>err.msg) });
    }
    next();
}