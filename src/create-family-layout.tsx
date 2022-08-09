import { ProfileInfo } from "./profile-info";
import { RootLayout } from "./root-layout";
import { FamilyLayout } from "./family-layout";
import {
  layoutNextPoint,
  defaultFamilySize,
  defaultProfileOffsetHorizontal,
  defaultChildOffsetVertical,
  defaultParentOffsetVertical,
  defaultProfileSize,
} from "./index";
import { Point } from "./point";
import { Rectangle } from "./rectangle";
import {
  ItemLink,
  FamilyLink,
  ProfileLink,
  Profile,
  TreeBackend,
} from "simple-family-tree-model";

function addParentFamilies(
  tree: TreeBackend,
  layout: RootLayout,
  profile: Profile,
  parentGenerationCount: number
) {
  // The profile's parents can be found by following the childInFamilies links
  const parentFamilies = profile.childInFamilies.getLinks();
  parentFamilies.forEach((element) => {
    const parentFamily = tree.findFamily(new FamilyLink(element.itemLink));
    if (parentFamily !== undefined) {
      // The root profile is a parent in this family
      const familyId = parentFamily.familyId.itemLink;
      if (!layout.families.has(familyId)) {
        console.log(
          "From parent " + profile.profileId + "List family: " + familyId
        );
        console.log(
          "show family " +
            familyId +
            " children:" +
            parentFamily.children.getLinks().length +
            " parents:" +
            parentFamily.parents.getLinks().length
        );
        const familyLayout = new FamilyLayout(
          familyId,
          new Rectangle(layoutNextPoint, defaultFamilySize)
        );

        console.log("Family " + familyId + " parent ");
        const spouses = parentFamily.parents.getLinks();
        spouses.forEach((element) => {
          const parent = tree.findProfile(new ProfileLink(element.itemLink));
          if (parent !== undefined) {
            const profileId = parent.profileId.itemLink;
            if (!layout.profiles.has(profileId)) {
              console.log(
                "From parent " +
                  profile.profileId +
                  " family " +
                  familyId +
                  " add parent " +
                  profileId
              );
              const parentPoint = new Point(
                familyLayout.rect.topLeft.x -
                  20 +
                  familyLayout.parents.length * defaultProfileOffsetHorizontal,
                familyLayout.rect.topLeft.y + defaultParentOffsetVertical
              );
              const placement: Rectangle = new Rectangle(
                parentPoint,
                defaultProfileSize
              );
              layout.profiles.set(profileId, familyId);
              familyLayout.profiles.set(
                profileId,
                new ProfileInfo(placement, parent)
              );
              familyLayout.parents.push(profileId);
              console.log("Add parent: ", profileId);
            }
          }
        });
        layout.families.set(familyId, familyLayout);
        const children = parentFamily.children.getLinks();
        children.forEach((element) => {
          const child = tree.findProfile(new ProfileLink(element.itemLink));
          if (child !== undefined) {
            const profileId = child.profileId.itemLink;
            if (!layout.profiles.has(profileId)) {
              console.log(
                "From parent " +
                  profile.profileId +
                  ", family " +
                  familyId +
                  " add child " +
                  profileId
              );
              const childPoint = new Point(
                familyLayout.rect.topLeft.x -
                  20 +
                  familyLayout.children.length * defaultProfileOffsetHorizontal,
                familyLayout.rect.topLeft.y + defaultChildOffsetVertical
              );
              const placement: Rectangle = new Rectangle(
                childPoint,
                defaultProfileSize
              );
              layout.profiles.set(profileId, familyId);
              familyLayout.profiles.set(
                profileId,
                new ProfileInfo(placement, child)
              );
              familyLayout.children.push(profileId);
              console.log("Add child: ", child.profileId.itemLink);
            }
          }
        });
      }
    }
  });
}

function addChildFamilies(
  tree: TreeBackend,
  layout: RootLayout,
  profile: Profile,
  childGenerationCount: number
) {
  // The profile's children and spouses can be found by following the parentInFamilies links
  const childFamilies = profile.parentInFamilies.getLinks();

  childFamilies.forEach((element) => {
    const family = tree.findFamily(new FamilyLink(element.itemLink));
    if (family !== undefined) {
      // The root profile is a child in this family
      const familyId = element.itemLink;
      const familyLayout = new FamilyLayout(
        familyId,
        new Rectangle(layoutNextPoint, defaultFamilySize)
      );
      if (!layout.families.has(familyId)) {
        console.log("Add child family: {}", family.familyId.itemLink);
        const children = family.children.getLinks();
        children.forEach((element) => {
          const child = tree.findProfile(new ProfileLink(element.itemLink));
          if (child !== undefined) {
            const profileId = element.itemLink;
            if (!layout.profiles.has(profileId)) {
              const childPoint = new Point(
                familyLayout.rect.topLeft.x -
                  20 +
                  familyLayout.children.length * defaultProfileOffsetHorizontal,
                familyLayout.rect.topLeft.y + defaultChildOffsetVertical
              );
              const placement: Rectangle = new Rectangle(
                childPoint,
                defaultFamilySize
              );
              layout.profiles.set(profileId, profileId);
              familyLayout.profiles.set(
                profileId,
                new ProfileInfo(placement, child)
              );
              console.log("Addchild: ", profileId);
              if (childGenerationCount > 0) {
                addChildFamilies(tree, layout, child, childGenerationCount - 1);
              }
            }
          }
        });
        const spouses = family.parents.getLinks();
        spouses.forEach((element) => {
          const spouse = tree.findProfile(new ProfileLink(element.itemLink));
          if (spouse !== undefined) {
            const profileId = element.itemLink;
            if (!layout.profiles.has(profileId)) {
              const childPoint = new Point(
                familyLayout.rect.topLeft.x -
                  20 +
                  familyLayout.children.length * defaultProfileOffsetHorizontal,
                familyLayout.rect.topLeft.y + defaultChildOffsetVertical
              );
              const placement: Rectangle = new Rectangle(
                childPoint,
                defaultFamilySize
              );
              layout.profiles.set(profileId, profileId);
              familyLayout.profiles.set(
                profileId,
                new ProfileInfo(placement, spouse)
              );
              console.log("Addchild: ", profileId);
              if (childGenerationCount > 0) {
                addChildFamilies(
                  tree,
                  layout,
                  spouse,
                  childGenerationCount - 1
                );
              }
            }
          }
        });
      }
    }
  });
}

export function createFamilyLayout(
  tree: TreeBackend,
  startProfile: ProfileLink,
  parentCount: number,
  childCount: number
): RootLayout {
  const layout: RootLayout = new RootLayout();

  const profile = tree.findProfile(startProfile);

  if (profile !== undefined) {
    // We start by setting the root profile
    const startProfileId = profile.profileId.itemLink;
    layout.anchorProfile = startProfileId;
    console.log(
      "show profile " +
        startProfileId +
        " child in " +
        profile.childInFamilies.getLinks().length +
        " families, parent in " +
        profile.parentInFamilies.getLinks().length +
        " families "
    );

    // Now we check if the root profile is a parent in any families
    if (parentCount > 0) {
      addParentFamilies(tree, layout, profile, parentCount - 1);
    }

    if (childCount > 0) {
      addChildFamilies(tree, layout, profile, childCount - 1);
    }
  }
  return layout;
}
