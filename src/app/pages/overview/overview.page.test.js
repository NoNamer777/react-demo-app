import { render, screen } from '@testing-library/react';
import OverviewPage from './overview.page';

test('renders the content', () => {
    render(<OverviewPage />);

    const paragraphElement = screen.getByText(/center-page works/i);

    expect(paragraphElement).toBeInTheDocument();
});
