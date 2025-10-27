import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";

const userLogin = catchAsync(async(req,res)=>{
    const { email, password } = req.body;

    const result = await AuthService.userLoginService(email, password);
  
    if (result.success) {
      res.status(200).json({
        success: result.success,
        statusCode: result.statusCode,
        message: result.message,
        token: result.token,
        data: result.data,
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }

})


export const AuthController = {
    userLogin,
}


