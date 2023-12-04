//home page with a get started page

import {Button, Container, Row, Col } from "react-bootstrap";

const Home = () => {
    return (
        <div class = "center">
            <Container>
                <Row>
                    <Col>
                        <h1>Get Started</h1>
                        <p>Upload a song to get started</p>
                        <Button href="/upload">Upload</Button>
                    </Col>
                
                    <Col>
                        <h1>Search</h1>
                        <p>Search for a song</p>
                        <Button href="/search">Search</Button>
                    </Col>
                    <Col>
                        <h1>Popular</h1>
                        <p>See the most popular songs</p>
                        <Button href="/popular">Popular</Button>
                    </Col>
                    <Col>
                        <h1>Artists</h1>
                        <p>See the most popular artists</p>
                        <Button href="/artists">Artists</Button>
                    </Col>
                </Row>



            </Container>
        </div>
    );

}

export default Home;