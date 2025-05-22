import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Badge, badgeVariants } from "../src/components/ui/badge"; 
// Mock the cn utility
jest.mock("@/lib/utils", () => ({
  cn: (...args: unknown[]) => args.filter(Boolean).join(" "),
}));

describe("Badge Component", () => {
  describe("Rendering", () => {
    it("renders correctly with default props", () => {
      render(<Badge>Test Badge</Badge>);
      const badge = screen.getByText("Test Badge");
      expect(badge).toBeInTheDocument();
      expect(badge.tagName).toBe("SPAN");
      expect(badge).toHaveAttribute("data-slot", "badge");
    });

    it("renders children correctly", () => {
      render(
        <Badge>
          <span data-testid="child">Child Content</span>
        </Badge>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("forwards additional props to the component", () => {
      render(<Badge data-testid="custom-badge">Test Badge</Badge>);
      expect(screen.getByTestId("custom-badge")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("applies default variant when no variant is specified", () => {
      render(<Badge>Default Badge</Badge>);
      const badge = screen.getByText("Default Badge");
      
      // Check that default variant classes are applied
      expect(badge.className).toContain("bg-primary");
      expect(badge.className).toContain("text-primary-foreground");
    });

    it("applies secondary variant correctly", () => {
      render(<Badge variant="secondary">Secondary Badge</Badge>);
      const badge = screen.getByText("Secondary Badge");
      
      // Check that secondary variant classes are applied
      expect(badge.className).toContain("bg-secondary");
      expect(badge.className).toContain("text-secondary-foreground");
    });

    it("applies destructive variant correctly", () => {
      render(<Badge variant="destructive">Destructive Badge</Badge>);
      const badge = screen.getByText("Destructive Badge");
      
      // Check that destructive variant classes are applied
      expect(badge.className).toContain("bg-destructive");
      expect(badge.className).toContain("text-white");
    });

    it("applies outline variant correctly", () => {
      render(<Badge variant="outline">Outline Badge</Badge>);
      const badge = screen.getByText("Outline Badge");
      
      // Check that outline variant classes are applied
      expect(badge.className).toContain("text-foreground");
    });
  });

  describe("asChild Prop", () => {
    it("renders as span when asChild is false", () => {
      render(<Badge asChild={false}>As Span</Badge>);
      const badge = screen.getByText("As Span");
      expect(badge.tagName).toBe("SPAN");
    });

    it("renders as child component when asChild is true", () => {
      render(
        <Badge asChild>
          <a href="#">As Link</a>
        </Badge>
      );
      const badge = screen.getByText("As Link");
      expect(badge.tagName).toBe("A");
      expect(badge).toHaveAttribute("href", "#");
      expect(badge).toHaveAttribute("data-slot", "badge");
    });
  });

  describe("CSS Classes", () => {
    it("applies additional className when provided", () => {
      render(<Badge className="custom-class">With Custom Class</Badge>);
      const badge = screen.getByText("With Custom Class");
      expect(badge.className).toContain("custom-class");
    });

    it("applies all common badge classes", () => {
      render(<Badge>Common Classes</Badge>);
      const badge = screen.getByText("Common Classes");
      
      // Test some of the common classes from the cva base
      expect(badge.className).toContain("inline-flex");
      expect(badge.className).toContain("items-center");
      expect(badge.className).toContain("rounded-md");
      expect(badge.className).toContain("border");
      expect(badge.className).toContain("text-xs");
      expect(badge.className).toContain("whitespace-nowrap");
    });
    
    it("combines variant classes with common classes", () => {
      render(<Badge variant="destructive">Combined Classes</Badge>);
      const badge = screen.getByText("Combined Classes");
      
      // Should have both common classes and destructive variant classes
      expect(badge.className).toContain("inline-flex");
      expect(badge.className).toContain("border-transparent");
      expect(badge.className).toContain("bg-destructive");
      expect(badge.className).toContain("text-white");
    });
  });

  // Test the actual badgeVariants function
  describe("badgeVariants function", () => {
    it("returns the correct classes for each variant", () => {
      const defaultClasses = badgeVariants({ variant: "default" });
      const secondaryClasses = badgeVariants({ variant: "secondary" });
      const destructiveClasses = badgeVariants({ variant: "destructive" });
      const outlineClasses = badgeVariants({ variant: "outline" });
      
      // Check that each variant string includes expected classes
      expect(defaultClasses).toContain("bg-primary");
      expect(secondaryClasses).toContain("bg-secondary");
      expect(destructiveClasses).toContain("bg-destructive");
      expect(outlineClasses).toContain("text-foreground");
      
      // Also check that each has the common classes
      [defaultClasses, secondaryClasses, destructiveClasses, outlineClasses].forEach(classes => {
        expect(classes).toContain("inline-flex");
        expect(classes).toContain("items-center");
        expect(classes).toContain("rounded-md");
      });
    });
    
    it("uses default variant when no variant is specified", () => {
      const defaultVariantClasses = badgeVariants({});
      const explicitDefaultClasses = badgeVariants({ variant: "default" });
      
      // Both should be the same
      expect(defaultVariantClasses).toBe(explicitDefaultClasses);
    });
  });
});