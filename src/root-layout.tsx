import { Point } from "./point";
import { FamilyLayout } from "./family-layout";
import { FamilyLink, TreeBackend } from "simple-family-tree-model";
import { layoutNextPoint, defaultParentOffsetVertical } from "./index";

enum Relation {
  None,
  Parent,
  Child,
}

function findRelation(
  tree: TreeBackend,
  family1: FamilyLink,
  family2: FamilyLink
): Relation {
  const fam1 = tree.findFamily(family1);
  const fam2 = tree.findFamily(family2);
  if (fam1 != undefined && fam2 != undefined) {
    for (const person1 of fam1.children.getLinks().entries()) {
      for (const person2 of fam2.parents.getLinks().entries()) {
        if (person1 == person2) {
          return Relation.Parent;
        }
      }
    }
    for (const person1 of fam1.parents.getLinks().entries()) {
      for (const person2 of fam2.children.getLinks().entries()) {
        if (person1 == person2) {
          return Relation.Child;
        }
      }
    }
  }
  return Relation.None;
}

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

  findFamilyPosition = (tree: TreeBackend, family: FamilyLink): Point => {
    const nextPoint: Point = layoutNextPoint;

    this.families.forEach((element: FamilyLayout, key: string) => {
      const relation = findRelation(tree, family, new FamilyLink(key));
      if (relation === Relation.Parent) {
        const familyRect = element.getOuterBounds();
        return new Point(
          familyRect.getTopLeft().x,
          familyRect.getTopLeft().y - defaultParentOffsetVertical
        );
      }
      if (relation === Relation.Child) {
        const familyRect = element.getOuterBounds();
        return new Point(
          familyRect.getTopLeft().x,
          familyRect.getBottomRight().y + defaultParentOffsetVertical
        );
      }
    });
    return nextPoint;
  };
}
