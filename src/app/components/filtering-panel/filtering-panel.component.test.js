import { render, screen } from '@testing-library/react';
import FilteringPanelComponent from './filtering-panel.component';

test('renders the content', () => {
    render(<FilteringPanelComponent />);

    const paragraphElement = screen.getByText(/filtering-panel-component works/i);

    expect(paragraphElement).toBeInTheDocument();
});
