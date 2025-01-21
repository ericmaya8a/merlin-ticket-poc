import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Counter } from "./Counter";

describe("Counter Component", () => {
  it("renders the component with the correct initial count", () => {
    render(
      <Counter
        count={5}
        isCritical={false}
        isMinusDisabled={false}
        onAdd={vi.fn()}
        onMinus={vi.fn()}
      />,
    );

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it('calls the onAdd function when the "+" button is clicked', () => {
    const onAddMock = vi.fn();
    render(
      <Counter
        count={5}
        isCritical={false}
        isMinusDisabled={false}
        onAdd={onAddMock}
        onMinus={vi.fn()}
      />,
    );

    const addButton = screen.getByRole("button", { name: /Increase count/i });
    fireEvent.click(addButton);

    expect(onAddMock).toHaveBeenCalledTimes(1);
  });

  it('calls the onMinus function when the "-" button is clicked', () => {
    const onMinusMock = vi.fn();
    render(
      <Counter
        count={5}
        isCritical={false}
        isMinusDisabled={false}
        onAdd={vi.fn()}
        onMinus={onMinusMock}
      />,
    );

    const minusButton = screen.getByRole("button", { name: /Decrease count/i });
    fireEvent.click(minusButton);

    expect(onMinusMock).toHaveBeenCalledTimes(1);
  });

  it('disables the "-" button when isMinusDisabled is true', () => {
    render(
      <Counter
        count={5}
        isCritical={false}
        isMinusDisabled={true}
        onAdd={vi.fn()}
        onMinus={vi.fn()}
      />,
    );

    const minusButton = screen.getByRole("button", { name: /Decrease count/i });
    expect(minusButton).toBeDisabled();
  });
});
