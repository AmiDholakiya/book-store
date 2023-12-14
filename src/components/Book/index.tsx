import React, { useEffect, useState } from "react";
import { initialBookObj } from "../BookList";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form } from "react-bootstrap";
import { BookType, FormState } from "types";

export interface BookTypeAsProps {
    book: BookType | undefined;
    handleChange(data: BookType | undefined): void;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    price: Yup.string().matches(/^([0]([.][0-9]+)?|[1-9]([0-9]+)?([.][0-9]+)?)$/, {
        message: 'Inccorect Price format. Example 25 or 25.1',
        excludeEmptyString: true
    }),
    category: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required'),
});


const Book = ({ book, handleChange }: BookTypeAsProps) => {
    const [formData, setFormData] = useState<FormState | undefined>()

    useEffect(() => setFormData(book as FormState), [])

    const handleLocalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setFormData(({[e.target.name]: e.target.value} as unknown) as BookType);
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    useEffect(() => {
        handleChange(formData as BookType)
    }, [formData])

    return <div className="book">
        <Formik
            initialValues={{ name: '', email: '' }}
            validationSchema={validationSchema}
            onSubmit={() => { }}
        >
            <FormikForm>
                <Form >
                    <Form.Group className="mb-3" controlId="bookForm.name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            placeholder="The Magic Tree"
                            autoFocus
                            name="name"
                            value={formData?.name}
                            onChange={handleLocalChange}
                        />
                        <ErrorMessage name="name" component="div" className="text-danger" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="bookForm.name">
                        <Form.Label>Price</Form.Label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="price">$</span>
                            </div>
                            <input name="price" type="text" className="form-control" placeholder="120.50" aria-label="price" aria-describedby="price" value={formData?.price}
                                onChange={handleLocalChange} />
                        </div>
                        <ErrorMessage name="price" component="div" className="text-danger" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="bookForm.category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            placeholder="Romantic"
                            value={formData?.category}
                            onChange={handleLocalChange}
                            name="category"
                        />
                        <ErrorMessage name="category" component="div" className="text-danger" />

                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="bookForm.description"
                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" name="description" rows={3} value={formData?.description}
                            onChange={handleLocalChange} />
                        <ErrorMessage name="description" component="div" className="text-danger" />

                    </Form.Group>
                </Form>
            </FormikForm>
        </Formik>
    </div>
}

export default Book;

