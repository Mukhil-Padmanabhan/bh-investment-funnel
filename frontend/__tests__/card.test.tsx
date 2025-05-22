import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "../src/components/ui/card"; // Adjust path if needed

// Mock the cn utility
jest.mock("@/lib/utils", () => ({
  cn: (...args: unknown[]) => args.filter(Boolean).join(" "),
}));

describe("Card Components", () => {
  describe("Card", () => {
    it("renders correctly with default props", () => {
      render(<Card>Card Content</Card>);
      const card = screen.getByText("Card Content");
      expect(card).toBeInTheDocument();
      expect(card).toHaveAttribute("data-slot", "card");
    });

    it("applies default classes", () => {
      render(<Card>Card Content</Card>);
      const card = screen.getByText("Card Content");
      expect(card.className).toContain("bg-card");
      expect(card.className).toContain("text-card-foreground");
      expect(card.className).toContain("rounded-xl");
      expect(card.className).toContain("border");
      expect(card.className).toContain("shadow-sm");
    });

    it("applies additional className when provided", () => {
      render(<Card className="custom-class">Card Content</Card>);
      const card = screen.getByText("Card Content");
      expect(card.className).toContain("custom-class");
    });

    it("forwards additional props to the div", () => {
      render(<Card data-testid="custom-card" id="test-id">Card Content</Card>);
      const card = screen.getByTestId("custom-card");
      expect(card).toHaveAttribute("id", "test-id");
    });
  });

  describe("CardHeader", () => {
    it("renders correctly with default props", () => {
      render(<CardHeader>Header Content</CardHeader>);
      const header = screen.getByText("Header Content");
      expect(header).toBeInTheDocument();
      expect(header).toHaveAttribute("data-slot", "card-header");
    });

    it("applies default classes", () => {
      render(<CardHeader>Header Content</CardHeader>);
      const header = screen.getByText("Header Content");
      expect(header.className).toContain("@container/card-header");
      expect(header.className).toContain("grid");
      expect(header.className).toContain("items-start");
      expect(header.className).toContain("px-6");
    });

    it("applies additional className when provided", () => {
      render(<CardHeader className="custom-header">Header Content</CardHeader>);
      const header = screen.getByText("Header Content");
      expect(header.className).toContain("custom-header");
    });

    it("forwards additional props to the div", () => {
      render(<CardHeader data-testid="custom-header" id="header-id">Header Content</CardHeader>);
      const header = screen.getByTestId("custom-header");
      expect(header).toHaveAttribute("id", "header-id");
    });
  });

  describe("CardTitle", () => {
    it("renders correctly with default props", () => {
      render(<CardTitle>Card Title</CardTitle>);
      const title = screen.getByText("Card Title");
      expect(title).toBeInTheDocument();
      expect(title).toHaveAttribute("data-slot", "card-title");
    });

    it("applies default classes", () => {
      render(<CardTitle>Card Title</CardTitle>);
      const title = screen.getByText("Card Title");
      expect(title.className).toContain("leading-none");
      expect(title.className).toContain("font-semibold");
    });

    it("applies additional className when provided", () => {
      render(<CardTitle className="custom-title">Card Title</CardTitle>);
      const title = screen.getByText("Card Title");
      expect(title.className).toContain("custom-title");
    });
  });

  describe("CardDescription", () => {
    it("renders correctly with default props", () => {
      render(<CardDescription>Card Description</CardDescription>);
      const description = screen.getByText("Card Description");
      expect(description).toBeInTheDocument();
      expect(description).toHaveAttribute("data-slot", "card-description");
    });

    it("applies default classes", () => {
      render(<CardDescription>Card Description</CardDescription>);
      const description = screen.getByText("Card Description");
      expect(description.className).toContain("text-muted-foreground");
      expect(description.className).toContain("text-sm");
    });

    it("applies additional className when provided", () => {
      render(<CardDescription className="custom-desc">Card Description</CardDescription>);
      const description = screen.getByText("Card Description");
      expect(description.className).toContain("custom-desc");
    });
  });

  describe("CardAction", () => {
    it("renders correctly with default props", () => {
      render(<CardAction>Card Action</CardAction>);
      const action = screen.getByText("Card Action");
      expect(action).toBeInTheDocument();
      expect(action).toHaveAttribute("data-slot", "card-action");
    });

    it("applies default classes", () => {
      render(<CardAction>Card Action</CardAction>);
      const action = screen.getByText("Card Action");
      expect(action.className).toContain("col-start-2");
      expect(action.className).toContain("row-span-2");
      expect(action.className).toContain("row-start-1");
      expect(action.className).toContain("self-start");
      expect(action.className).toContain("justify-self-end");
    });

    it("applies additional className when provided", () => {
      render(<CardAction className="custom-action">Card Action</CardAction>);
      const action = screen.getByText("Card Action");
      expect(action.className).toContain("custom-action");
    });
  });

  describe("CardContent", () => {
    it("renders correctly with default props", () => {
      render(<CardContent>Card Content Area</CardContent>);
      const content = screen.getByText("Card Content Area");
      expect(content).toBeInTheDocument();
      expect(content).toHaveAttribute("data-slot", "card-content");
    });

    it("applies default classes", () => {
      render(<CardContent>Card Content Area</CardContent>);
      const content = screen.getByText("Card Content Area");
      expect(content.className).toContain("px-6");
    });

    it("applies additional className when provided", () => {
      render(<CardContent className="custom-content">Card Content Area</CardContent>);
      const content = screen.getByText("Card Content Area");
      expect(content.className).toContain("custom-content");
    });
  });

  describe("CardFooter", () => {
    it("renders correctly with default props", () => {
      render(<CardFooter>Card Footer</CardFooter>);
      const footer = screen.getByText("Card Footer");
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveAttribute("data-slot", "card-footer");
    });

    it("applies default classes", () => {
      render(<CardFooter>Card Footer</CardFooter>);
      const footer = screen.getByText("Card Footer");
      expect(footer.className).toContain("flex");
      expect(footer.className).toContain("items-center");
      expect(footer.className).toContain("px-6");
    });

    it("applies additional className when provided", () => {
      render(<CardFooter className="custom-footer">Card Footer</CardFooter>);
      const footer = screen.getByText("Card Footer");
      expect(footer.className).toContain("custom-footer");
    });
  });

  describe("Card composition", () => {
    it("composes all card components together correctly", () => {
      render(
        <Card data-testid="full-card">
          <CardHeader data-testid="card-header">
            <CardTitle data-testid="card-title">Example Title</CardTitle>
            <CardDescription data-testid="card-description">Example Description</CardDescription>
            <CardAction data-testid="card-action">Action</CardAction>
          </CardHeader>
          <CardContent data-testid="card-content">Main content goes here</CardContent>
          <CardFooter data-testid="card-footer">Footer content</CardFooter>
        </Card>
      );

      // Check that all components are rendered
      const card = screen.getByTestId("full-card");
      const header = screen.getByTestId("card-header");
      const title = screen.getByTestId("card-title");
      const description = screen.getByTestId("card-description");
      const action = screen.getByTestId("card-action");
      const content = screen.getByTestId("card-content");
      const footer = screen.getByTestId("card-footer");

      // Check presence
      expect(card).toBeInTheDocument();
      expect(header).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(action).toBeInTheDocument();
      expect(content).toBeInTheDocument();
      expect(footer).toBeInTheDocument();

      // Check text content
      expect(title).toHaveTextContent("Example Title");
      expect(description).toHaveTextContent("Example Description");
      expect(content).toHaveTextContent("Main content goes here");
      expect(footer).toHaveTextContent("Footer content");

      // Check that components are properly nested
      expect(card).toContainElement(header);
      expect(card).toContainElement(content);
      expect(card).toContainElement(footer);
      expect(header).toContainElement(title);
      expect(header).toContainElement(description);
      expect(header).toContainElement(action);
    });
  });
});