import { verifyUser } from "../models/UserModel.js";

describe("verifyUser function", () => {
  test("should return 401 status and 'Please login to your account' message when access_token is not present", async () => {
    const req = { cookies: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    await verifyUser(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith("Please login to your account");
  });

  // tambahkan test case lainnya sesuai kebutuhan
});
