import LuhnAlgorithm from "./LuhnAlgorithm";

describe("Luhn Algorithm", () => {
  test("passes with valid RSA ID", () => {
    const RSA_ID = "9003195041087";

    const result = LuhnAlgorithm(RSA_ID);

    expect(result).toBe(true);
  });

  test("fails with invalid RSA ID", () => {
    const RSA_ID = "900319225";

    const result = LuhnAlgorithm(RSA_ID);

    expect(result).toBe(false);
  });
});
