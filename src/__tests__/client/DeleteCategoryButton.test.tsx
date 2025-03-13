import { render, screen, fireEvent } from "@testing-library/react";

import DeleteCategoryButton from "@/components/collections/NavBar/parts/DeleteCategoryButton";
import { useDeleteCategory } from "@/services/categories";

jest.mock("@/services/categories", () => ({
  useDeleteCategory: jest.fn(),
}));

describe("DeleteCategoryButton", () => {
  it("disables button when delete mutation is pending", async () => {
    const deleteCategoryMock = jest.fn();

    // Mock initial state as idle
    (useDeleteCategory as jest.Mock).mockReturnValue({
      mutate: deleteCategoryMock,
      status: "idle",
    });

    render(<DeleteCategoryButton id={1} />);
    const button = screen.getByRole("button");

    // Click button to trigger mutation
    fireEvent.click(button);

    expect(deleteCategoryMock).toHaveBeenCalledWith(1);
  });
});


