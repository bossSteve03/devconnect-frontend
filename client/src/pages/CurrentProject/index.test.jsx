import React from "react";
import { describe, expect, beforeEach, afterEach, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CurrentProject from ".";
import { ProjectsProvider, UserProvider } from "../../context";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

describe("Current Project", () => {
  beforeEach(() => {
    render(
      <UserProvider>
        <ProjectsProvider>
          <BrowserRouter>
            <CurrentProject />
          </BrowserRouter>
        </ProjectsProvider>
      </UserProvider>
    );
  });
  it("should render a Current Project component", () => {
    const currentProject = screen.getByText("CurrentProject");
    expect(currentProject).toBeInTheDocument();
  });
});
