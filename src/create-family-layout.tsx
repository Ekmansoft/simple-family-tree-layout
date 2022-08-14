import { ProfileInfo } from "./profile-info";
import { RootLayout } from "./root-layout";
import { FamilyLayout } from "./family-layout";
import {
  defaultFamilySize,
  defaultProfileOffsetHorizontal,
  defaultChildOffsetVertical,
  defaultParentOffsetVertical,
  defaultProfileSize,
} from "./index";
import { Point } from "./point";
import { Rectangle } from "./rectangle";
import {
  FamilyLink,
  ProfileLink,
  Profile,
  Family,
  TreeBackend,
} from "simple-family-tree-model";

function addParentFamiliesFromProfile(
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
      addProfilesFromFamily(
        tree,
        layout,
        parentFamily,
        parentGenerationCount - 1
      );
    }
  });
}

function addProfilesFromFamily(
  tree: TreeBackend,
  layout: RootLayout,
  family: Family,
  childGenerationCount: number
) {
  if (!layout.families.has(family.familyId.itemLink)) {
    const familyId = family.familyId.itemLink;
    const nextPoint = layout.findFamilyPosition(tree, family.familyId);
    const familyLayout = new FamilyLayout(
      familyId,
      new Rectangle(nextPoint, defaultFamilySize)
    );
    console.log("Add family: {}", family.familyId.itemLink);
    const children = family.children.getLinks();
    children.forEach((element) => {
      if (!layout.profileAlreadyInLayout(new ProfileLink(element.itemLink))) {
        const child = tree.findProfile(new ProfileLink(element.itemLink));
        if (child !== undefined) {
          const profileId = element.itemLink;
          console.log(
            "  Family: {} add child:{}",
            family.familyId.itemLink,
            profileId
          );
          if (!layout.profiles.has(profileId)) {
            const childPoint = new Point(
              familyLayout.rect.topLeft.x -
                20 +
                familyLayout.children.length * defaultProfileOffsetHorizontal,
              familyLayout.rect.topLeft.y + defaultChildOffsetVertical
            );
            familyLayout.children.push(profileId);
            const placement: Rectangle = new Rectangle(
              childPoint,
              defaultProfileSize
            );
            layout.profiles.set(profileId, profileId);
            familyLayout.profiles.set(
              profileId,
              new ProfileInfo(placement, child)
            );
            console.log("Addchild: ", profileId);
            if (childGenerationCount > 0) {
              addSpousesAndChildrenFromProfile(
                tree,
                layout,
                child,
                childGenerationCount - 1
              );
            }
          }
        } else {
          console.log(
            "  Family: {} child {} missing",
            family.familyId.itemLink,
            element.itemLink
          );
        }
      }
    });
    const spouses = family.parents.getLinks();
    spouses.forEach((element) => {
      if (!layout.profileAlreadyInLayout(new ProfileLink(element.itemLink))) {
        const spouse = tree.findProfile(new ProfileLink(element.itemLink));
        if (spouse !== undefined) {
          const profileId = element.itemLink;
          console.log(
            "  Family: {} add parent:{}",
            family.familyId.itemLink,
            profileId
          );
          if (!layout.profiles.has(profileId)) {
            const spousePoint = new Point(
              familyLayout.rect.topLeft.x -
                20 +
                familyLayout.parents.length * defaultProfileOffsetHorizontal,
              familyLayout.rect.topLeft.y + defaultParentOffsetVertical
            );
            const placement: Rectangle = new Rectangle(
              spousePoint,
              defaultProfileSize
            );
            layout.profiles.set(profileId, profileId);
            familyLayout.profiles.set(
              profileId,
              new ProfileInfo(placement, spouse)
            );
            familyLayout.parents.push(profileId);
            console.log("Addchild: ", profileId);
            if (childGenerationCount > 0) {
              addSpousesAndChildrenFromProfile(
                tree,
                layout,
                spouse,
                childGenerationCount - 1
              );
            }
          }
        } else {
          console.log(
            "  Family: {} parent {} missing",
            family.familyId.itemLink,
            element.itemLink
          );
        }
      }
    });
    layout.families.set(family.familyId.itemLink, familyLayout);
  }
}

function addSpousesAndChildrenFromProfile(
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
      addProfilesFromFamily(tree, layout, family, childGenerationCount - 1);
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

    // Now we check if the profile is a parent in any families
    if (parentCount > 0) {
      addParentFamiliesFromProfile(tree, layout, profile, parentCount - 1);
    }

    // Now we check if the profile is a child in any families
    if (childCount > 0) {
      addSpousesAndChildrenFromProfile(tree, layout, profile, childCount - 1);
    }
  }
  return layout;
}
