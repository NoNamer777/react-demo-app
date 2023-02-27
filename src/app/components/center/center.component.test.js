import { render, screen } from '@testing-library/react';
import CenterComponent from './center.component';

test('renders the content', () => {
    render(<CenterComponent />);

    const paragraphElement = screen.getByText(/center-component works/i);

    expect(paragraphElement).toBeInTheDocument();
});
