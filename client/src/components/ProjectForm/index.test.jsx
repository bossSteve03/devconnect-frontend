import React from "react";
import { describe, expect, beforeEach, afterEach, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProjectForm from ".";
import { ProjectsProvider } from "../../context";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
describe("ProjectForm", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ProjectsProvider>
          <ProjectForm />
        </ProjectsProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("should render the form", () => {
    const titleInput = screen.getByLabelText("Title");
    const descriptionInput = screen.getByLabelText("Description");
    const durationInput = screen.getByLabelText("Duration");
    const collaboratorsInput = screen.getByLabelText("Number of Collaborators");
    const techStackInput = screen.getByLabelText("Tech stack");
    const positionsInput = screen.getByLabelText("Positions");
    const submitButton = screen.getByText("Submit");

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(durationInput).toBeInTheDocument();
    expect(collaboratorsInput).toBeInTheDocument();
    expect(techStackInput).toBeInTheDocument();
    expect(positionsInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should update state when inputs change", () => {
    const titleInput = screen.getByLabelText("Title");
    const descriptionInput = screen.getByLabelText("Description");
    const durationInput = screen.getByLabelText("Duration");
    const collaboratorsInput = screen.getByLabelText("Number of Collaborators");
    const techStackInput = screen.getByLabelText("Tech stack");
    const positionsInput = screen.getByLabelText("Positions");

    fireEvent.change(titleInput, { target: { value: "Project Title" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Project Description" },
    });
    fireEvent.change(durationInput, { target: { value: "2 weeks" } });
    fireEvent.change(collaboratorsInput, { target: { value: "3" } });
    fireEvent.change(techStackInput, { target: { value: "React, Node.js" } });
    fireEvent.change(positionsInput, {
      target: { value: "Frontend Developer" },
    });

    expect(titleInput.value).toBe("Project Title");
    expect(descriptionInput.value).toBe("Project Description");
    expect(durationInput.value).toBe("2 weeks");
    expect(collaboratorsInput.value).toBe("3");
    expect(techStackInput.value).toBe("React, Node.js");
    expect(positionsInput.value).toBe("Frontend Developer");
  });
});
