import { render, screen } from '@testing-library/react';
import FooterComponent from './footer.component';

test('renders the content', () => {
    render(<FooterComponent />);

    const paragraphElement = screen.getByText(/footer-component works/i);

    expect(paragraphElement).toBeInTheDocument();
});
