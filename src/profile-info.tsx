import { Rectangle } from "./rectangle";
import { Profile } from "simple-family-tree-model";

export class ProfileInfo {
  layout: Rectangle;
  profile: Profile;
  constructor(layout: Rectangle, profile: Profile) {
    this.layout = layout;
    this.profile = profile;
  }
}
