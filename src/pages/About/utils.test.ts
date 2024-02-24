import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { findCurrentSectionIndex, scrollToSection } from "./utils";

describe("scrollToSection", () => {
  const originalWindow = window;
  vi.spyOn(window, "scrollTo");

  beforeEach(() => {
    window = originalWindow;
  });

  it("scrolls to the correct section", async () => {
    const mockSectionsData = ["section-0", "section-1", "section-2"];

    // Mock getElementById to simulate finding elements
    global.document.getElementById = vi.fn((id: string) => ({
      offsetTop: 100 * parseInt(id.split("-")[1], 10), // Simulate different offsetTop values
    })) as any;

    // Call the function with the first section as the current section
    scrollToSection(0, mockSectionsData);

    // Check if scrollTo was called with expected arguments
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0, // Based on our mock, this should be the offsetTop of the second section
      behavior: "smooth",
    });
  });

  it("scrolls to the correct section1", async () => {
    const mockSectionsData = ["section-0", "section-1", "section-2"];

    // Mock getElementById to simulate finding elements
    global.document.getElementById = vi.fn((id: string) => ({
      offsetTop: 100 * parseInt(id.split("-")[1], 10), // Simulate different offsetTop values
    })) as any;

    // Call the function with the first section as the current section
    scrollToSection(1, mockSectionsData);

    // Check if scrollTo was called with expected arguments
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 100, // Based on our mock, this should be the offsetTop of the second section
      behavior: "smooth",
    });
  });
  it("scrolls to the correct section2", async () => {
    const mockSectionsData = ["section-0", "section-1", "section-2"];

    // Mock getElementById to simulate finding elements
    global.document.getElementById = vi.fn((id: string) => ({
      offsetTop: 100 * parseInt(id.split("-")[1], 10), // Simulate different offsetTop values
    })) as any;

    // Call the function with the first section as the current section
    scrollToSection(2, mockSectionsData);

    // Check if scrollTo was called with expected arguments
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 200, // Based on our mock, this should be the offsetTop of the second section
      behavior: "smooth",
    });
  });
});

describe("findCurrentSectionIndex", () => {
  // Mock window.innerHeight
  const originalInnerHeight = window.innerHeight;
  beforeEach(() => {
    window.innerHeight = 800; // Example viewport height
  });

  afterEach(() => {
    window.innerHeight = originalInnerHeight; // Reset after each test
  });

  it("returns -1 when no sections are in the viewport", () => {
    const mockSectionsData = ["section-0", "section-1", "section-2"];

    // Mock getBoundingClientRect to simulate sections out of the viewport
    global.document.getElementById = vi
      .fn()
      .mockImplementation((id: string) => ({
        getBoundingClientRect: () => ({
          top: 900, // Beyond the viewport
          bottom: 1100,
        }),
      }));

    const index = findCurrentSectionIndex(mockSectionsData);
    expect(index).toBe(-1);
  });

  it("returns the index of a section when it is in the viewport", () => {
    const mockSectionsData = ["section-0", "section-1", "section-2"];

    // Mock getBoundingClientRect to simulate sections out of the viewport
    global.document.getElementById = vi
      .fn()
      .mockImplementation((id: string) => ({
        getBoundingClientRect: () => ({
          top: 100, // Beyond the viewport
          bottom: 700,
        }),
      }));

    const index = findCurrentSectionIndex(mockSectionsData);
    expect(index).toBe(0);
  });

  it("returns the index of the first section in the viewport when multiple are visible", () => {
    const mockSectionsData = ["section-0", "section-1", "section-2"];

    // Simulate 'section-0' and 'section-1' both being in the viewport
    global.document.getElementById = vi
      .fn()
      .mockImplementation((id: string) => ({
        getBoundingClientRect: () => ({
          top: id === "section-0" ? 100 : 300, // 'section-0' starts higher in the viewport
          bottom: id === "section-0" ? 600 : 800,
        }),
      }));

    const index = findCurrentSectionIndex(mockSectionsData);
    expect(index).toBe(0); // Should return the first visible section
  });
});
