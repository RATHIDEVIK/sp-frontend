import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p>StylzPrints,No 5/1 K.Muthanampalayam Post,Tirupur-641608,+9843008712.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
