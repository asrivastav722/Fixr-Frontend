import { Button, Form, Input } from "antd"

const OnBoardingScreen = ({navigate,setPhone,phone,loading,handleSendOTP}) => {
    return <div className="h-screen w-screen d-flex align-items-center justify-center">
        <div className="h-screen w-screen md:rounded-2xl md:border md:h-fit md:w-fit d-flex flex-col justify-between bg-white text-gray-600">

      {/* Skip button */}

      <header className='d-flex border-b justify-content-end p-3 poppins'>
        <Button 
          type="default" 
          onClick={() => navigate('/location', { state: { isGuest: true } })}
          size='large' 
          className="poppins text-[10px] text-gray-900 font-medium shadow-none"
        >
          Skip
        </Button>
      </header>

      {/* Phone Field */}
        <Form className="d-flex flex-col justify-between h-full p-3" onFinish={handleSendOTP} layout="vertical" >
          <Form.Item label="Enter Your Phone Number" name="phone">
            <Input onChange={(e)=>setPhone(e.target.value)} maxLength={10} prefix="+91" size="large" className='text-xs poppins' placeholder="XXXXXXXXXX" />
          </Form.Item>

          <footer className="text-center d-flex flex-col items-center gap-2">
            <p className=' poppins text-[10px] m-0 p-0 d-flex align-items-center'>By Continuing, you agree our <a href='/' className='text-blue-500 px-1'> T&C </a> and <a href='/' className='text-blue-500 px-1'> Privacy Policy </a></p> 

            <Button disabled={phone?.length!==10} type="primary" className='poppins w-full text-[10px] ' htmlType="submit" loading={loading} >
              Continue
          </Button>
          </footer>
        </Form>
      

     
        
    </div>
    </div>
} 
export default OnBoardingScreen