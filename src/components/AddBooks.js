import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import BookDataService from "../services/book-services";
const AddBooks = ({ id, setBookId }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState("Available");
    const [flag, setFlag] = useState(true);
    const [message, setMessage] = useState({ error: false, msg: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (title == "" || author == "") {
            setMessage({ error: true, msg: "All the fields are mandatory" });
            return;
        }
        const newBook = {
            title,
            author,
            status
        }
        console.log(newBook);
        try {
            // We want to update our book
            if (id != "" && id != undefined) {
                await BookDataService.updateBook(id, newBook)
                setBookId("");
                setMessage({ error: false, msg: "Book Successfully updated! Please click on refresh to see the result"})
            }
            // here we want to add new book 
            else {
                await BookDataService.addBooks(newBook)
                setMessage({ error: false, msg: "Book Successfully added! Please click on refresh to see the result"})
            }
        }
        catch (err) {
            setMessage({ error: true, msg: err.message })
        }
        setTitle("");
        setAuthor("");
    };
    const editHandler = async () => {
        try {
            const docSnap = await BookDataService.getBook(id);
            console.log("The record is: ", docSnap.data());
            setTitle(docSnap.data().title);
            setAuthor(docSnap.data().author);
            setStatus(docSnap.data().status);
        }
        catch (err) {
            setMessage({ error: true, msg: err.message });
        }

    };
    useEffect(() => {
        console.log("the id is here: ", id);
        if (id != "" && id != undefined) {
            editHandler();
        }
    }, [id]);
    return (
        <>
            <div className="p-4 box">
                <div className="buttons">
                    {message?.msg && (
                        <Alert
                            variant={message?.error ? "danger" : "success"}
                            dismissible
                            onClose={() => setMessage("")}
                        >
                            {message?.msg}
                        </Alert>
                    )}
                </div>
                <Form onSubmit={handleSubmit}>
                    <div className="input-elments">
                        <Form.Group className="mb-3" controlId="formBookTitle">
                            <InputGroup>
                                <InputGroup.Text className="input-type" id="formBookTitle">B</InputGroup.Text>
                                <Form.Control className="input-text"
                                    type="text"
                                    placeholder="Book Title"
                                    value={title}
                                    onChange={(e) => { setTitle(e.target.value) }}
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBookAuthor">
                            <InputGroup >
                                <InputGroup.Text className="input-type" id="formBookAuthor">A</InputGroup.Text>
                                <Form.Control className="input-text"
                                    type="text"
                                    placeholder="Book Author"
                                    value={author}
                                    onChange={(e) => { setAuthor(e.target.value) }}
                                />
                            </InputGroup>
                        </Form.Group>
                    </div>
                    <div className="buttons">
                        <ButtonGroup id="btns" aria-label="Basic example" className="mb-3">
                            <Button variant="outline-dark" onClick={(e) => setStatus("Available")}>Available</Button>
                            <Button variant="secondary" onClick={(e) => setStatus("Not Available")}>Not Available</Button>
                        </ButtonGroup>
                    </div>
                    <div className="d-grid gap-2 buttons">
                        <Button variant="primary" type="Submit">
                            Add/ Update
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default AddBooks;