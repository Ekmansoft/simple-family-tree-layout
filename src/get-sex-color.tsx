import { ProfileSex } from "simple-family-tree-model";

export function getSexColor(sex: ProfileSex): string {
  if (sex === ProfileSex.Male) {
    return "lightblue";
  }
  if (sex === ProfileSex.Female) {
    return "lightpink";
  }
  return "white";
}
