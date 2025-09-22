import { render, screen } from '@testing-library/react';
import App from './App';

test('renders StreamView brand', () => {
  render(<App />);
  const brand = screen.getByText(/StreamView/i);
  expect(brand).toBeInTheDocument();
});
