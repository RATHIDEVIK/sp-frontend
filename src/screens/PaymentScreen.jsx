import { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';

// Assuming you have imported your QR code image here
import qrCodeImage from '../assets/qr-code.jpg';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const [showQRCodeImage, setShowQRCodeImage] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    setShowQRCodeImage(true); // Show QR code image

    // After 3 seconds, hide the QR code and navigate to the next screen
    setTimeout(() => {
      setShowQRCodeImage(false);
      navigate('/placeorder');
    }, 5000);
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      {showQRCodeImage ? (
        <div>
          <p>Scan the QR code to complete your payment:</p>
          <img src={qrCodeImage} alt="QR Code" />
        </div>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
              <Form.Check
                className='my-2'
                type='radio'
                label='GooglePay or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='GooglePay'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Continue
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default PaymentScreen;
