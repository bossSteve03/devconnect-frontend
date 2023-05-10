import React from "react";
import { describe, expect, beforeEach, afterEach, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AboutUs from ".";
import { ProjectsProvider, UserProvider } from "../../context";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

describe("AboutUs", () => {
  beforeEach(() => {
    render(
      <UserProvider>
        <ProjectsProvider>
          <BrowserRouter>
            <AboutUs />
          </BrowserRouter>
        </ProjectsProvider>
      </UserProvider>
    );
  });

  it("should render About Us", () => {
    expect(screen.getByText("Who are we?")).toBeInTheDocument();
  });
});
