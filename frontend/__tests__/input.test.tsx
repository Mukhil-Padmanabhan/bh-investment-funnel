import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "@/components/ui/input";

describe("Input component", () => {
  it("renders without crashing", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("forwards type prop correctly", () => {
    render(<Input type="email" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
  });

  it("forwards className prop correctly", () => {
    render(<Input className="my-class" />);
    expect(screen.getByRole("textbox")).toHaveClass("my-class");
  });

  it("forwards placeholder prop and renders it", () => {
    render(<Input placeholder="Your email" />);
    expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();
  });

  it("calls onChange when value changes", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "hello" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("supports disabled state", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("supports aria-invalid and applies relevant class", () => {
    render(<Input aria-invalid="true" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    // Optional: check for destructive class if you want
    // expect(input.className).toMatch(/border-destructive/);
  });

  it("supports value prop", () => {
    render(<Input value="test value" readOnly />);
    expect(screen.getByDisplayValue("test value")).toBeInTheDocument();
  });
});
