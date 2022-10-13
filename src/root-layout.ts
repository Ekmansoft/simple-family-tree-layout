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
import { profileSvgStyles } from "./render-profile-svg";
import { defaultLayoutSize } from "./index";
import { layoutNextPoint } from "./index";

export class RootLayout {
  families: Map<string, FamilyLayout>;
  profiles: Map<string, string>;
  anchorPosition: Point;
  anchorProfile: string;
  size: Point;

  constructor() {
    this.families = new Map<string, FamilyLayout>();
    this.profiles = new Map<string, string>();
    this.anchorPosition = new Point(layoutNextPoint.x, layoutNextPoint.y);
    this.anchorProfile = "";
    this.size = new Point(defaultLayoutSize.x, defaultLayoutSize.y);
  }

  profileAlreadyInLayout = (profileId: ProfileLink): boolean => {
    this.families.forEach((element: FamilyLayout, _: string) => {
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
      element.profiles.forEach((element: ProfileInfo, _: string) => {
        const relation = findRelation(tree, family, new ProfileLink(key));
        // console.log("relation", relation);
        if (relation === Relation.Parent) {
          const profileRect = element.layout;
          // console.log("parent");
          nextPoint = new Point(
            profileRect.getTopLeft().x,
            profileRect.getTopLeft().y -
              profileSvgStyles.profileBox.verticalOffsetChild
          );
        }
        if (relation === Relation.Child) {
          const profileRect = element.layout;
          // console.log("child");
          nextPoint = new Point(
            profileRect.getTopLeft().x,
            profileRect.getTopLeft().y +
              profileSvgStyles.profileBox.verticalOffsetParent
          );
        }
      });
    });
    // console.log("none");
    return nextPoint;
  };
}
