import { render, screen } from '@testing-library/react';
import HeaderComponent from './header.component';

test('renders the content', () => {
    render(<HeaderComponent />);

    const paragraphElement = screen.getByText(/header-component works/i);

    expect(paragraphElement).toBeInTheDocument();
});
