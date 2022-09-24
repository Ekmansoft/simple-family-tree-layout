import React from "react";
import { RootLayout } from "./root-layout";
import { createFamilyLayout } from "./create-family-layout";
import { generateVerticalTreeLayout } from "./generate-vertical-tree-layout";
import { LocalTreeBackend, ProfileLink } from "simple-family-tree-model";

export interface TreeLayoutInfo {
  tree: LocalTreeBackend;
  layout: RootLayout;
  focusProfile: ProfileLink;
}

export class VerticalTreeLayout extends React.Component<TreeLayoutInfo> {
  layout = createFamilyLayout(this.props.tree, this.props.focusProfile, 2, 2);
  render() {
    return <svg>{generateVerticalTreeLayout(this.props.layout)}</svg>;
  }
}
