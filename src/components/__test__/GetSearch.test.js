import { render, screen } from "@testing-library/react";
import GetSearch from "../GetSearch";

describe("Test the GetSearch Component", () => {
  test("render the GetSearch section with search button", async () => {
    render(<GetSearch />);
    const button = await screen.findAllByRole("button");
    expect(button).toHaveLength(1);
  });
});
