import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Editor from './Editor';

test("Render without crashing", () => {
    render(<Editor />);
    expect(screen.getByText(/New/i)).toBeInTheDocument();
    expect(screen.getByText(/Title:/i)).toBeInTheDocument();
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Start writing...")).toBeInTheDocument();
});

test("New button resets document", async () => {
    render(<Editor />);
    const user = userEvent.setup();
    const titleInput = document.querySelector("#doc-title");

    titleInput.value = "Test title";
    expect(titleInput.value).toBe("Test title");
    await user.click(screen.getByText("New"));
    expect(titleInput.value).toBe("");
});
