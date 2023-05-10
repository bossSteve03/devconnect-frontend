import React from "react";
import { describe, expect, beforeEach, afterEach, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Landing from ".";
import { ProjectsProvider, UserProvider } from "../../context";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

describe("Landing", () => {
  beforeEach(() => {
    render(
      <UserProvider>
        <ProjectsProvider>
          <BrowserRouter>
            <Landing />
          </BrowserRouter>
        </ProjectsProvider>
      </UserProvider>
    );
  });
  it("should render a Landing component", () => {
    const landing = screen.getByRole("heading", { name: "Next gen collaboration at your fingertips" })
    expect(landing).toBeInTheDocument();
  });
});
