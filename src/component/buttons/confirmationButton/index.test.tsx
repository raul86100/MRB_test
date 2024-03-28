import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Acceptbutton from './index';

describe('userButton component', () => {
  const mockCallback = jest.fn();

  test('renders with the provided button name', () => {
    const { getByText } = render(<Acceptbutton btnname="Accept" callback={mockCallback} positive={true} />);
    expect(getByText('Accept')).toBeInTheDocument();
  });

  test('calls the callback function when clicked', () => {
    const { getByText } = render(<Acceptbutton btnname="Accept" callback={mockCallback} positive={true} />);
    fireEvent.click(getByText('Accept'));
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  test('renders with "accept-btn" class when positive prop is true', () => {
    const { getByText } = render(<Acceptbutton btnname="Accept" callback={mockCallback} positive={true} />);
    const button = getByText('Accept');
    expect(button).toHaveClass('accept-btn');
    expect(button).not.toHaveClass('reject-btn');
  });

  test('renders with "reject-btn" class when positive prop is false', () => {
    const { getByText } = render(<Acceptbutton btnname="Reject" callback={mockCallback} positive={false} />);
    const button = getByText('Reject');
    expect(button).toHaveClass('reject-btn');
    expect(button).not.toHaveClass('accept-btn');
  });
});
