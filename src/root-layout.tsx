import { Point } from "./point";
import { FamilyLayout } from "./family-layout";
import { ProfileInfo } from "./profile-info";
import {
  FamilyLink,
  ProfileLink,
  TreeBackend,
  Relation,
  findRelation,
} from "simple-family-tree-model";
import { layoutNextPoint, defaultParentOffsetVertical } from "./index";

export class RootLayout {
  families: Map<string, FamilyLayout>;
  profiles: Map<string, string>;
  anchorPosition: Point;
  anchorProfile: string;

  constructor() {
    this.families = new Map<string, FamilyLayout>();
    this.profiles = new Map<string, string>();
    this.anchorPosition = new Point(400, 400);
    this.anchorProfile = "";
  }

  profileAlreadyInLayout = (profileId: ProfileLink): boolean => {
    this.families.forEach((element: FamilyLayout, key: string) => {
      if (element.profiles.has(profileId.itemLink)) {
        return true;
      }
    });
    return false;
  };

  findFamilyPosition = (tree: TreeBackend, family: FamilyLink): Point => {
    let nextPoint: Point = layoutNextPoint;

    // console.log("findpos", family);
    this.families.forEach((element: FamilyLayout, key: string) => {
      element.profiles.forEach((element: ProfileInfo, key: string) => {
        const relation = findRelation(tree, family, new ProfileLink(key));
        // console.log("relation", relation);
        if (relation === Relation.Parent) {
          const profileRect = element.layout;
          // console.log("parent");
          nextPoint = new Point(
            profileRect.getTopLeft().x,
            profileRect.getTopLeft().y - defaultParentOffsetVertical
          );
        }
        if (relation === Relation.Child) {
          const profileRect = element.layout;
          // console.log("child");
          nextPoint = new Point(
            profileRect.getTopLeft().x,
            profileRect.getTopLeft().y + defaultParentOffsetVertical
          );
        }
      });
    });
    // console.log("none");
    return nextPoint;
  };
}
