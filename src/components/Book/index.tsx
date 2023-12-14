import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { BookType, FormState } from "types";
import { priceRegEx } from "utils";

export interface BookTypeAsProps {
    book: BookType | undefined;
    handleChange(data: BookType | undefined): void;
}

const Book = ({ book, handleChange }: BookTypeAsProps) => {
    const [formData, setFormData] = useState<FormState | undefined>()

    useEffect(() => setFormData(book as FormState), [])

    const handleLocalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setFormData(({[e.target.name]: e.target.value} as unknown) as BookType);
        if (e.target.name === "price" && !e.target.value.match(priceRegEx)) return;
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    useEffect(() => {
        handleChange(formData as BookType)
    }, [formData])

    return <div className="book">
                        <Form >
                    <Form.Group className="mb-3" controlId="bookForm.name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            placeholder="The Magic Tree"
                            autoFocus
                            name="name"
                            value={formData && formData.name ? formData.name : undefined}
                            onChange={handleLocalChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="bookForm.name">
                        <Form.Label>Price</Form.Label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="price">$</span>
                            </div>
                            <input name="price" type="text" className="form-control" placeholder="120.50" aria-label="price" aria-describedby="price" value={formData && formData.price ? formData.price : undefined}
                                onChange={handleLocalChange} />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="bookForm.category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            placeholder="Romantic"
                            value={formData && formData.category ? formData.category : undefined}
                            onChange={handleLocalChange}
                            name="category"
                        />

                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="bookForm.description"
                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" name="description" rows={3} value={formData && formData.description ? formData.description : undefined}
                            onChange={handleLocalChange} />

                    </Form.Group>
                </Form>
    </div>
}

export default Book;

