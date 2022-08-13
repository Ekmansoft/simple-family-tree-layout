import { ProfileInfo } from "./profile-info";
import { Rectangle } from "./rectangle";
import { Family } from "simple-family-tree-model";

export class FamilyLayout {
  familyId: string;
  familyInfo: Family | undefined;
  rect: Rectangle;
  profiles: Map<string, ProfileInfo>;
  parents: string[];
  children: string[];

  constructor(familyId: string, rect: Rectangle) {
    this.familyId = familyId;
    this.rect = rect;
    this.profiles = new Map<string, ProfileInfo>();
    this.parents = [];
    this.children = [];
  }
  getOuterBounds = (): Rectangle => {
    const outerRect: Rectangle = this.rect;
    for (const profileLayout of this.profiles.values())  {
      if (outerRect.topLeft.x < profileLayout.layout.topLeft.x) {
        outerRect.topLeft.x = profileLayout.layout.topLeft.x;
      }
      if (outerRect.topLeft.y < profileLayout.layout.topLeft.y) {
        outerRect.topLeft.y = profileLayout.layout.topLeft.y;
      }
      if (outerRect.getBottomRight().x < profileLayout.layout.getBottomRight().x) {
        outerRect.size.x = profileLayout.layout.getBottomRight().x - outerRect.topLeft.x;
      }
      if (outerRect.getBottomRight().y < profileLayout.layout.getBottomRight().y) {
        outerRect.size.y = profileLayout.layout.getBottomRight().y - outerRect.topLeft.y;
      }
    }
    return outerRect;
  }
}
