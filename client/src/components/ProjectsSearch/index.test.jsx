import React from "react";
import { describe, expect, beforeEach, afterEach, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProjectsSearch from ".";
import { ProjectsProvider, UserProvider } from "../../context";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

describe("ProjectsSearch", () => {
  beforeEach(() => {
    render(
      <UserProvider>
        <ProjectsProvider>
          <BrowserRouter>
            <ProjectsSearch />
          </BrowserRouter>
        </ProjectsProvider>
      </UserProvider>
    );
  });

  afterEach(cleanup);

  it("should render the search bar", () => {
    const searchBar = screen.getByTestId("search");
    expect(searchBar).toBeInTheDocument();
  });

  it("should update the query state when typing in the search bar", () => {
    const searchBar = screen.getByPlaceholderText("Search");
    fireEvent.change(searchBar, { target: { value: "example" } });
    expect(searchBar.value).toBe("example");
  });

  it("should display 'Loading...' when isLoading is true", () => {
    const loadingText = screen.getByText("SearchBar", {
      selector: ".page-heading",
    });

    expect(loadingText).toBeInTheDocument();
  });
  it("should display the project title and description when projects are available", () => {
    const mockProjects = [
      { title: "Project 1", description: "Description 1" },
      { title: "Project 2", description: "Description 2" },
    ];

    const useProjectsMock = jest.fn();

    useProjectsMock.mockReturnValue({
      projects: mockProjects,
      setProjects: jest.fn(),
    });

    jest.mock("../../context", () => ({
      useProjects: useProjectsMock,
    }));

    const projectTitles = screen.getAllByRole("heading", {
      name: /project title/i,
    });
    const projectDescriptions = screen.getAllByRole("paragraph", {
      name: /project description/i,
    });

    expect(projectTitles.length).toBe(mockProjects.length);
    expect(projectDescriptions.length).toBe(mockProjects.length);

    mockProjects.forEach((project, index) => {
      expect(projectTitles[index]).toHaveTextContent(project.title);
      expect(projectDescriptions[index]).toHaveTextContent(project.description);
    });
  });
});
