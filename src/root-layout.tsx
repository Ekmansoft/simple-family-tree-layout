import { Point } from "./point";
import { FamilyLayout } from "./family-layout";
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
    this.anchorPosition = new Point(100, 100);
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
    const nextPoint: Point = layoutNextPoint;

    this.families.forEach((element: FamilyLayout, key: string) => {
      const relation = findRelation(tree, family, new FamilyLink(key));
      console.log(relation);
      if (relation === Relation.Parent) {
        const familyRect = element.rect;
        return new Point(
          familyRect.getTopLeft().x,
          familyRect.getTopLeft().y - defaultParentOffsetVertical
        );
      }
      if (relation === Relation.Child) {
        const familyRect = element.rect;
        return new Point(
          familyRect.getTopLeft().x,
          familyRect.getTopLeft().y + defaultParentOffsetVertical
        );
      }
    });
    return nextPoint;
  };
}
