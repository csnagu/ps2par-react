import { deconv } from "./decoder";

test("assert result", () => {
  expect(deconv("1CC89FC8 14545568")).toEqual(
    "patch=1,EE,00511CA0,word,00029243"
  );
});
test("assert result", () => {
  expect(deconv("1CC89FCC 2A84E7A6")).toEqual(
    "patch=1,EE,00511CA4,word,36520001"
  );
});
