import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import DocSelector from './DocSelector';

test('Renders without crashing ', () => {
    render(<DocSelector />);
    expect(screen.getByText(/Choose a document/i)).toBeInTheDocument();
    expect(screen.getByText(/Open/i)).toBeInTheDocument();
});

test("User selects a document",  () => {
    const fetchDoc = jest.fn();
    const docs = [{
        _id: 1123456789101112,
        title: "Test title",
        content: "Test content"
    }];

    render(<DocSelector docs={docs} fetchDoc={fetchDoc} />);
    fireEvent.click(screen.getByText("Choose a document"));
    fireEvent.click(screen.getByText("Test title"));
    expect(screen.getByText(/Test title/i));
});
