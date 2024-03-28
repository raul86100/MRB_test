import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./index";

describe("activityHeader unit test", () => {
  const mockCallback = jest.fn();
  const mockLabel = ["Pending", "Upcoming", "History"];

  test("headerlabel", () => {
    const { getByText } = render(
      <Header
        label={mockLabel}
        defaultLabel={mockLabel[0]}
        callback={mockCallback}
      />
    );

    mockLabel.forEach((string) => {
      expect(getByText(string)).toBeInTheDocument();
    });
  });

  test("backgroung color classname", () => {
    const { getByText } = render(
      <Header
        label={mockLabel}
        defaultLabel={mockLabel[0]}
        callback={mockCallback}
      />
    );
    expect(getByText(mockLabel[0])).toHaveClass("blue");
    const newlabel = mockLabel.slice(1, mockLabel.length - 1);
    newlabel.forEach((label) => {
      expect(getByText(label)).not.toHaveClass("blue");
      expect(getByText(label)).toHaveClass("nonblue");
    });
  });
  test("onclick eventchecking", () => {
    const { getByText } = render(
      <Header
        label={mockLabel}
        defaultLabel={mockLabel[0]}
        callback={mockCallback}
      />
    );
    const newlabel = mockLabel.slice(1, mockLabel.length - 1);
    newlabel.forEach((item) => {
      const label = getByText(item);
      expect(label).not.toHaveClass("blue");
      expect(label).toHaveClass("nonblue");
      fireEvent.click(label);
      expect(label).toHaveClass("blue");
    });
  });

  test("onclick event checking", () => {
    const { getByText } = render(
      <Header
        label={mockLabel}
        defaultLabel={mockLabel[0]}
        callback={mockCallback}
      />
    );
    const newlabel = mockLabel.slice(1, mockLabel.length - 1);
    newlabel.forEach((item) => {
      const label = getByText(item);
      fireEvent.click(label);
      expect(label).toHaveClass("blue");
      expect(mockCallback).toHaveBeenCalledWith(item);
      expect(mockCallback).toBeCalledTimes(1);
    });
  });

});
