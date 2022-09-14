import logo from './logo.svg';
import './App.css';
import { Row, Col } from 'react-bootstrap';
import {Container} from 'react-bootstrap'
import AddBooks from './components/AddBooks';
import BookList from './components/BookList';
import { useState } from 'react';
function App() {
  const [bookId, setBookId] = useState("");
  const getBookIdHandler = (id)=>{
    console.log("id of the document to be edited", id);
    setBookId(id);
  }
  return (
    <>
      <Container style={{width: "600px"}}>
        <Row>
          <Col>
            <AddBooks id={bookId} setBookId={setBookId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <BookList getBookId={getBookIdHandler}/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
