import React from 'react';
import { describe, expect, beforeEach, afterEach, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LandingNav from '.';
import { BrandName } from '../../components';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers)


describe('LandingNav layout', () => {

  beforeEach(() => {
    render(
      <BrowserRouter>
        <LandingNav />
      </BrowserRouter>
    )
  });

  afterEach(() => {
    cleanup();
  })

  it('renders Home link', () => {
    const navEl = screen.getByText(/Home/i);
    expect(navEl).toBeInTheDocument();
  });

  it('renders About link', () => {
    const navEl = screen.getByText(/About/i);
    expect(navEl).toBeInTheDocument();
  });
  
  it('renders Login link', () => {
    const navEl = screen.getByText(/Login/i);
    expect(navEl).toBeInTheDocument();
  });
  
  it('renders Dev text', () => {
    const navEl = screen.getByText(/Dev/i)
    const nav = navEl.firstElementChild;
    expect(nav).toBeInTheDocument();
  });
  
  it('renders Connect text', () => {
    const navEl = screen.getByText(/Connect/i)
    const nav = navEl.firstElementChild;
    expect(nav).toBeInTheDocument();
  });
  
  it('relocates window correctly with Home link', () => {
  const navEl = screen.getByText(/Home/i);
  fireEvent.click(navEl);
  expect(window.location.href).toEqual('http://localhost:3000/');
  });

  it('relocates window correctly with About link', () => {
    const navEl = screen.getByText(/About/i);
    fireEvent.click(navEl);
    expect(window.location.href).toEqual('http://localhost:3000/about');
  });
  
  it('relocates window correctly with Login link', () => {
    const navEl = screen.getByText(/Login/i);
    fireEvent.click(navEl);
    expect(window.location.href).toEqual('http://localhost:3000/login');
  });

});
