import {Alert, Button,  Form, Row, Col, Stack} from "react-bootstrap";

const Register = () => {
    return ( <>
    

    <Form>
        <Row style={{
            height:"100vh",
            justifyContent:"center",
            paddingTop:"10%"
        }}>
            <Col xs={6}>
                <Stack gap={3}>
                    <h2 style={{textAlign:"center"}}>Register</h2>
                    <Form.Control type="text" placeholder="Name"></Form.Control>
                    <Form.Control type="email" placeholder="Email"></Form.Control>
                    <Form.Control type="password" placeholder="Password"></Form.Control>
                    <Form.Control type="password" placeholder="ConfirmPassword"></Form.Control>
                    <Button variant="success" type="submit">Register</Button>
                    <Alert variant="danger"></Alert>
                </Stack>
            </Col>
        </Row>
    </Form>
            
    </> );
}
 
export default Register;