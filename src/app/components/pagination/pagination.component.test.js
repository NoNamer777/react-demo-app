import { render, screen } from '@testing-library/react';
import PaginationComponent from './pagination.component';

test('renders the content', () => {
    render(<PaginationComponent />);

    const paragraphElement = screen.getByText(/header-component works/i);

    expect(paragraphElement).toBeInTheDocument();
});
