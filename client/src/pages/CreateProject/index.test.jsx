import React from "react";
import { describe, expect, beforeEach, afterEach, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CreateProject from ".";
import { ProjectsProvider, UserProvider } from "../../context";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

describe("Create Project", () => {
  beforeEach(() => {
    render(
      <UserProvider>
        <ProjectsProvider>
          <BrowserRouter>
            <CreateProject />
          </BrowserRouter>
        </ProjectsProvider>
      </UserProvider>
    );
  });
  it("should render a ProjectForm component", () => {
    const projectForm = screen.getByRole("heading", {
      name: "Project Form",
    });
    expect(projectForm).toBeInTheDocument();
  });
});
