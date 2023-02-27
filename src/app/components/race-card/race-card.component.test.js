import { render, screen } from '@testing-library/react';
import RaceCardComponent from './race-card.component';

test('renders the content', () => {
    render(<RaceCardComponent />);

    const paragraphElement = screen.getByText(/race-card-component works/i);

    expect(paragraphElement).toBeInTheDocument();
});
