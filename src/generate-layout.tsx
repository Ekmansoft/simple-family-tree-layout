import React from "react";
import { RootLayout } from "./root-layout";
import { RenderFamilySVG } from "./render-family-svg";
import { RenderProfileSVG } from "./render-profile-svg";

export function generateLayout(layout: RootLayout) {
  const svgData: JSX.Element[] = [];

  console.log("families {} ", layout.families.size);

  layout.families.forEach((element) => {
    //let profilePlace = new FamilyInfo(element.layout, element.family);
    svgData.push(<RenderFamilySVG {...element} />);
    element.profiles.forEach((profile) => {
      svgData.push(<RenderProfileSVG {...profile} />);
    });
    console.log(element);
  });
  return svgData;
}
