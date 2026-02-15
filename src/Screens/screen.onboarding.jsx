import { Button, Form, Input } from "antd"

const OnBoardingScreen = ({navigate,setPhone,phone,loading,handleSendOTP}) => {
    return <div className="h-screen w-screen d-flex align-items-center justify-center">
        <div className="h-screen w-screen md:rounded-2xl md:border md:h-fit md:w-fit d-flex flex-col justify-between bg-gray-100 p-3 text-gray-600">

      {/* Skip button */}

      <header className='d-flex justify-content-end'>
        <Button 
          type="default" 
          onClick={() => navigate('/location', { state: { isGuest: true } })}
          size='large' 
          className="roboto bg-gray-100 text-sm text-gray-600 border-gray-600 shadow-none"
        >
          Skip
        </Button>
      </header>

      {/* Phone Field */}
      <section className='d-flex flex-col h-full py-24 '>
        <Form onFinish={handleSendOTP} layout="vertical" >
          <Form.Item label="Enter Your Phone Number" name="phone">
            <Input onChange={(e)=>setPhone(e.target.value)} maxLength={10} prefix="+91" size="large" className='text-xl roboto' placeholder="XXXXXXXXXX" />
          </Form.Item>
            <Button disabled={phone?.length!==10} type="primary" className='roboto w-full text-sm py-4' htmlType="submit" loading={loading} >
              Sent OTP
          </Button>
        </Form>
      </section>

      {/* T&C */}
      <footer className='d-flex justify-center align-items-center roboto text-xs'>
        <p className='m-0 p-0'>Please visit our <a href='/' className='text-blue-500'> Terms & Conditions </a></p> 
        
      </footer>
        
        
    </div>
    </div>
} 
export default OnBoardingScreen