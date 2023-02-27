import { render, screen } from '@testing-library/react';
import AppComponent from './app.component';

test('renders the content', () => {
    render(<AppComponent />);

    const paragraghElement = screen.getByText(/app-component/i);

    expect(paragraghElement).toBeInTheDocument();
});
