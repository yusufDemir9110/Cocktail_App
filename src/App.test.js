import { render, screen } from "@testing-library/react";
import Home from "./pages/Home";

test("HomePage renders with Vodafone Ziggo Bar title", () => {
  render(<Home />);
  const linkElement = screen.getByText(/Vodafone Ziggo Bar/i);
  expect(linkElement).toBeInTheDocument();
});
