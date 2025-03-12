import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";

import NavBar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/client";
import { useCategories } from "@/services/categories";


// Mock dependencies
jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("@/services/categories", () => ({ useCategories: jest.fn() }));
jest.mock("@/lib/supabase/client", () => ({ createClient: jest.fn() }));

describe("NavBar Component", () => {
  const mockPush = jest.fn();
  const mockSignOut = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useCategories as jest.Mock).mockReturnValue({ data: [{ name: "work", color: "#ff0000" }] });
    (createClient as jest.Mock).mockReturnValue({ auth: { signOut: mockSignOut } });
  });

  it("renders categories correctly", () => {
    render(<NavBar userID="123" />);
    expect(screen.getByText("#work")).toBeInTheDocument();
  });

  it("calls signOut and navigates on logout", async () => {
    render(<NavBar userID="123" />);

    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    expect(mockSignOut).toHaveBeenCalled();
  });
});
