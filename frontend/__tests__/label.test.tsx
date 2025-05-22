import React from "react";
import { render, screen } from "@testing-library/react";
import { Label } from "@/components/ui/label";

describe("Label component", () => {
  it("renders children", () => {
    render(<Label>Username</Label>);
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("renders with default classes", () => {
    render(<Label>Check me</Label>);
    const label = screen.getByText("Check me");
    expect(label.className).toMatch(/flex/);
    expect(label.className).toMatch(/text-sm/);
    expect(label).toHaveAttribute("data-slot", "label");
  });

  it("forwards htmlFor prop and links to input", () => {
    render(
      <>
        <Label htmlFor="my-input">My label</Label>
        <input id="my-input" />
      </>
    );
    expect(screen.getByText("My label")).toHaveAttribute("for", "my-input");
    // You can check accessibility association if needed:
    expect(screen.getByLabelText("My label")).toBeInTheDocument();
  });

  it("forwards other props", () => {
    render(<Label aria-label="custom-label">Label Text</Label>);
    expect(screen.getByText("Label Text")).toHaveAttribute("aria-label", "custom-label");
  });
});
