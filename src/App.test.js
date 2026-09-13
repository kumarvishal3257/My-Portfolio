import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import App from "./App";

test("renders the portfolio name", () => {
  render(<App />);
  expect(screen.getAllByText(/Vishal Kumar/i).length).toBeGreaterThan(0);
});

test("chat widget answers a contact suggestion", async () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: /ask about vishal/i }));
  fireEvent.click(screen.getByRole("button", { name: /how can i contact him/i }));
  const dialog = await screen.findByRole("dialog");
  await waitFor(
    () => {
      expect(within(dialog).getByText(/kumarvishal3257@gmail.com/i)).toBeInTheDocument();
    },
    { timeout: 2000 }
  );
  expect(within(dialog).getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/vishal-kumar-234a05190/"
  );
});
