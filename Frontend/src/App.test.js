// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import React,{useContext} from "react"
import {render, screen} from "@testing-library/react"
import Home from "./Components/Home/Home"
import Header from "./Components/Header"
import {BrowserRouter} from "react-router-dom"
import AppContext from "./Components/context/appcontext"

// const { state, dispatch } = useContext(AppContext);
describe("Testing React APP",()=>{
  test.todo("Should have JobHunt text in header")
  render(<BrowserRouter><Home/></BrowserRouter>)
  expect(screen.getByText("Job-Hunt")).toBeInTheDocument();
})


