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
}
