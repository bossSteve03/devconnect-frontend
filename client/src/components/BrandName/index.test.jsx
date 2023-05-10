import React from "react";
import { describe, expect, beforeEach, afterEach, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BrandName from ".";
import { ProjectsProvider } from "../../context";
import styles from "./index.module.css";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

describe("BrandName Component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ProjectsProvider>
          <BrandName />
        </ProjectsProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });
  it("renders the component with the correct class names", () => {
    const titleDiv = screen.getByTestId("title-div");
    const title1 = screen.getByTestId("title1");
    const title2 = screen.getByTestId("title2");

    expect(titleDiv).toHaveClass(styles.title);
    expect(title1).toHaveClass(styles.title1);
    expect(title2).toHaveClass(styles.title2);
  });

  it("renders the correct text for each heading", () => {
    const title1 = screen.getByTestId("title1");
    const title2 = screen.getByTestId("title2");

    expect(title1).toHaveTextContent("Dev");
    expect(title2).toHaveTextContent("Connect");
  });
});
