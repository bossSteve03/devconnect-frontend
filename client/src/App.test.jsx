import React from "react";
import { describe, expect, beforeEach, afterEach, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./src/App";
import { ProjectsProvider, UserProvider } from "../../context";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

describe("App", () => {
  beforeEach(() => {
    render(
      <UserProvider>
        <ProjectsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ProjectsProvider>
      </UserProvider>
    );
  });
  it("should render a App component", () => {
    const app = screen.getByRole("link", { name: /dashboard/i });
    expect(app).toBeInTheDocument();
  });
});
