import Razorpay from "razorpay";

export const razorpayInstance = ()=>{
    return new Razorpay({
        key_id:process.env.RAZORPAY_KEY_ID,
        key_secret:process.env.RAZORPAY_KEY_SECRET
    })
}

console.log(razorpayInstance);
