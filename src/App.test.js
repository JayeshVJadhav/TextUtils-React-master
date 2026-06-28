import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders the modern text utility experience', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /turn rough text into polished content in seconds/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /reverse text/i })).toBeInTheDocument();
});

test('restores the latest user-entered text after transformations', () => {
  render(<App />);
  const textarea = screen.getByLabelText(/your text/i);
  userEvent.type(textarea, 'Hello world');

  const uppercaseButton = screen.getByRole('button', { name: /uppercase/i });
  userEvent.click(uppercaseButton);

  const restoreButton = screen.getByRole('button', { name: /restore original/i });
  userEvent.click(restoreButton);

  expect(textarea).toHaveValue('Hello world');
});

test('restores the original user text after formatting actions', () => {
  render(<App />);
  const textarea = screen.getByLabelText(/your text/i);

  fireEvent.change(textarea, { target: { value: 'Hello world' } });
  fireEvent.click(screen.getByRole('button', { name: /uppercase/i }));
  expect(textarea.value).toBe('HELLO WORLD');

  fireEvent.click(screen.getByRole('button', { name: /restore original/i }));
  expect(textarea.value).toBe('Hello world');
});
