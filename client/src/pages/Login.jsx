import {Alert, Button,  Form, Row, Col, Stack} from "react-bootstrap";
import {Link} from 'react-router-dom'

const Login = () => {
    return ( <>
    

        <Form>
            <Row style={{
                height:"100vh",
                justifyContent:"center",
                paddingTop:"10%"
            }}>
                <Col xs={6}>
                    <Stack gap={3}>
                        <h2 style={{textAlign:"center"}}>Login</h2>
                        <Form.Control type="email" placeholder="Email"></Form.Control>
                        <Form.Control type="password" placeholder="Password"></Form.Control>
                        <Button variant="success" type="submit">Login</Button>
                        <Alert variant="danger"></Alert>
                        <Link to="/register" style={{textAlign:"center"}}>Don't have an accont?</Link>
                    </Stack>
                </Col>
            </Row>
        </Form>
                
        </> );
}
 
export default Login;