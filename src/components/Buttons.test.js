import React from 'react';
import { render, screen } from '@testing-library/react';
import Buttons from './Buttons';

test('Renders without crashing ', () => {
    render(<Buttons />);
    expect(screen.getByText(/Invite/i)).toBeInTheDocument();
    expect(screen.getByText(/Code-mode/i)).toBeInTheDocument();
    expect(screen.getByText(/PDF/i)).toBeInTheDocument();
});
