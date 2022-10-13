import React from "react";
import { RootLayout } from "./root-layout";
import { RenderFamilySVG } from "./render-family-svg";
import { RenderProfileSVG } from "./render-profile-svg";

export function generateVerticalTreeLayout(
  layout: RootLayout
): React.ReactElement[] {
  const svgData: React.ReactElement[] = [];

  layout.families.forEach((element) => {
    svgData.push(<RenderFamilySVG {...element} />);
    element.profiles.forEach((profile) => {
      svgData.push(<RenderProfileSVG {...profile} />);
    });
    //console.log(element);
  });
  return svgData;
}
