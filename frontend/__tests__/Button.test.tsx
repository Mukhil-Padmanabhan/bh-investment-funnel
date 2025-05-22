import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button, buttonVariants } from "../src/components/ui/button";

// Mock the cn utility
jest.mock("@/lib/utils", () => ({
  cn: (...args: unknown[]) => args.filter(Boolean).join(" "),
}));

describe("Button Component", () => {
  describe("Rendering", () => {
    it("renders correctly with default props", () => {
      render(<Button>Test Button</Button>);
      const button = screen.getByText("Test Button");
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("BUTTON");
      expect(button).toHaveAttribute("data-slot", "button");
    });

    it("renders children correctly", () => {
      render(
        <Button>
          <span data-testid="child">Child Content</span>
        </Button>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("forwards additional props to the component", () => {
      render(<Button data-testid="custom-button" type="submit">Test Button</Button>);
      const button = screen.getByTestId("custom-button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("type", "submit");
    });

    it("applies disabled state correctly", () => {
      render(<Button disabled>Disabled Button</Button>);
      const button = screen.getByText("Disabled Button");
      expect(button).toBeDisabled();
    });
  });

  describe("Variants", () => {
    it("applies default variant when no variant is specified", () => {
      render(<Button>Default Button</Button>);
      const button = screen.getByText("Default Button");
      
      // Check that default variant classes are applied
      expect(button.className).toContain("bg-primary");
      expect(button.className).toContain("text-primary-foreground");
      expect(button.className).toContain("shadow-xs");
    });

    it("applies destructive variant correctly", () => {
      render(<Button variant="destructive">Destructive Button</Button>);
      const button = screen.getByText("Destructive Button");
      
      // Check that destructive variant classes are applied
      expect(button.className).toContain("bg-destructive");
      expect(button.className).toContain("text-white");
    });

    it("applies outline variant correctly", () => {
      render(<Button variant="outline">Outline Button</Button>);
      const button = screen.getByText("Outline Button");
      
      // Check that outline variant classes are applied
      expect(button.className).toContain("border");
      expect(button.className).toContain("bg-background");
    });

    it("applies secondary variant correctly", () => {
      render(<Button variant="secondary">Secondary Button</Button>);
      const button = screen.getByText("Secondary Button");
      
      // Check that secondary variant classes are applied
      expect(button.className).toContain("bg-secondary");
      expect(button.className).toContain("text-secondary-foreground");
    });

    it("applies ghost variant correctly", () => {
      render(<Button variant="ghost">Ghost Button</Button>);
      const button = screen.getByText("Ghost Button");
      
      // Check that ghost variant classes are applied
      expect(button.className).toContain("hover:bg-accent");
      expect(button.className).toContain("hover:text-accent-foreground");
    });

    it("applies link variant correctly", () => {
      render(<Button variant="link">Link Button</Button>);
      const button = screen.getByText("Link Button");
      
      // Check that link variant classes are applied
      expect(button.className).toContain("text-primary");
      expect(button.className).toContain("hover:underline");
    });
  });

  describe("Sizes", () => {
    it("applies default size when no size is specified", () => {
      render(<Button>Default Size</Button>);
      const button = screen.getByText("Default Size");
      
      // Check that default size classes are applied
      expect(button.className).toContain("h-9");
      expect(button.className).toContain("px-4");
      expect(button.className).toContain("py-2");
    });

    it("applies small size correctly", () => {
      render(<Button size="sm">Small Button</Button>);
      const button = screen.getByText("Small Button");
      
      // Check that small size classes are applied
      expect(button.className).toContain("h-8");
      expect(button.className).toContain("px-3");
      expect(button.className).toContain("gap-1.5");
    });

    it("applies large size correctly", () => {
      render(<Button size="lg">Large Button</Button>);
      const button = screen.getByText("Large Button");
      
      // Check that large size classes are applied
      expect(button.className).toContain("h-10");
      expect(button.className).toContain("px-6");
    });

    it("applies icon size correctly", () => {
      render(<Button size="icon">Icon</Button>);
      const button = screen.getByText("Icon");
      
      // Check that icon size class is applied
      expect(button.className).toContain("size-9");
    });
  });

  describe("asChild Prop", () => {
    it("renders as button when asChild is false", () => {
      render(<Button asChild={false}>As Button</Button>);
      const button = screen.getByText("As Button");
      expect(button.tagName).toBe("BUTTON");
    });

    it("renders as child component when asChild is true", () => {
      render(
        <Button asChild>
          <a href="#">As Link</a>
        </Button>
      );
      const button = screen.getByText("As Link");
      expect(button.tagName).toBe("A");
      expect(button).toHaveAttribute("href", "#");
      expect(button).toHaveAttribute("data-slot", "button");
      expect(button.className).toContain("cursor-pointer");
    });
  });

  describe("CSS Classes", () => {
    it("applies additional className when provided", () => {
      render(<Button className="custom-class">With Custom Class</Button>);
      const button = screen.getByText("With Custom Class");
      expect(button.className).toContain("custom-class");
    });

    it("applies all common button classes", () => {
      render(<Button>Common Classes</Button>);
      const button = screen.getByText("Common Classes");
      
      // Test some of the common classes from the cva base
      expect(button.className).toContain("inline-flex");
      expect(button.className).toContain("items-center");
      expect(button.className).toContain("justify-center");
      expect(button.className).toContain("rounded-md");
      expect(button.className).toContain("text-sm");
      expect(button.className).toContain("font-medium");
      expect(button.className).toContain("cursor-pointer");
    });
    
    it("combines variant and size classes with common classes", () => {
      render(<Button variant="destructive" size="lg">Combined Classes</Button>);
      const button = screen.getByText("Combined Classes");
      
      // Should have common classes, destructive variant classes and lg size classes
      expect(button.className).toContain("inline-flex");
      expect(button.className).toContain("bg-destructive");
      expect(button.className).toContain("text-white");
      expect(button.className).toContain("h-10");
      expect(button.className).toContain("px-6");
    });

    it("adds cursor-pointer class to all buttons", () => {
      render(<Button>Cursor Pointer</Button>);
      const button = screen.getByText("Cursor Pointer");
      expect(button.className).toContain("cursor-pointer");
    });
  });

  // Test the actual buttonVariants function
  describe("buttonVariants function", () => {
    it("returns the correct classes for each variant", () => {
      const defaultClasses = buttonVariants({ variant: "default" });
      const destructiveClasses = buttonVariants({ variant: "destructive" });
      const outlineClasses = buttonVariants({ variant: "outline" });
      const secondaryClasses = buttonVariants({ variant: "secondary" });
      const ghostClasses = buttonVariants({ variant: "ghost" });
      const linkClasses = buttonVariants({ variant: "link" });
      
      // Check that each variant string includes expected classes
      expect(defaultClasses).toContain("bg-primary");
      expect(destructiveClasses).toContain("bg-destructive");
      expect(outlineClasses).toContain("border");
      expect(secondaryClasses).toContain("bg-secondary");
      expect(ghostClasses).toContain("hover:bg-accent");
      expect(linkClasses).toContain("text-primary");
      
      // Also check that each has the common classes
      [defaultClasses, destructiveClasses, outlineClasses, secondaryClasses, ghostClasses, linkClasses].forEach(classes => {
        expect(classes).toContain("inline-flex");
        expect(classes).toContain("items-center");
        expect(classes).toContain("justify-center");
      });
    });
    
    it("returns the correct classes for each size", () => {
      const defaultSizeClasses = buttonVariants({ size: "default" });
      const smSizeClasses = buttonVariants({ size: "sm" });
      const lgSizeClasses = buttonVariants({ size: "lg" });
      const iconSizeClasses = buttonVariants({ size: "icon" });
      
      // Check that each size string includes expected classes
      expect(defaultSizeClasses).toContain("h-9");
      expect(smSizeClasses).toContain("h-8");
      expect(lgSizeClasses).toContain("h-10");
      expect(iconSizeClasses).toContain("size-9");
    });
    
    it("uses default variants when no variants are specified", () => {
      const defaultClasses = buttonVariants({});
      const explicitDefaultClasses = buttonVariants({ variant: "default", size: "default" });
      
      // Both should be the same
      expect(defaultClasses).toBe(explicitDefaultClasses);
    });
  });
});