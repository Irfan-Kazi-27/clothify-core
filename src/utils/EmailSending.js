import { Resend } from 'resend';
import { ApiError } from './ApiError.js';

const resend = new Resend(process.env.RESEND_API_KEY);



export const SendEmail = async (email,username,token)=>{
  try {
    const resetLink = `http://localhost:5000/api/v1/reset-password?resettoken=${token}`
    const html = `<p> Hii ${username} , You Change the Password Using the Link below <br><a href=${resetLink}>Reset Password</a></p>`
    const {data,error}  = await resend.emails.send({
      from: 'clotify <clotify@resend.dev>',
      to: email,
      subject: 'To Change the Password',
      html:html 
    });

    if (error) {
      console.log( error)
    } else {
      console.log(data);
      return data
    }
    } catch (error) {
        throw new ApiError(501,"Problem Which sharing Email For reset password")
  }
  

};