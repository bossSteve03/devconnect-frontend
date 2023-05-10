import React from "react";
import { describe, expect, beforeEach, afterEach, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import User from ".";
import { ProjectsProvider, UserProvider } from "../../context";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

describe("User", () => {
  beforeEach(() => {
    render(
      <UserProvider>
        <ProjectsProvider>
          <BrowserRouter>
            <User />
          </BrowserRouter>
        </ProjectsProvider>
      </UserProvider>
    );
  });
  it("should render a User component", () => {
    const user = screen.getByRole("heading", { name: "Profile Page" });
    expect(user).toBeInTheDocument();
  });

  it("should render a Edit Button", () => {
    const editButton = screen.getByRole("button", { name: "Edit details" });
    expect(editButton).toBeInTheDocument();
  });
});
