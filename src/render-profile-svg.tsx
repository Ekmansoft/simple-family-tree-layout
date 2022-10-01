import React from "react"; // importing FunctionComponent
import { ProfileSex } from "simple-family-tree-model";
import { ProfileInfo } from "./profile-info";
import { Point } from "./point";

export const profileSvgStyles = {
  smallText: {
    fontSize: "0.9rem",
  },
  mainText: {
    fontSize: "1.5rem",
  },
  profileBox: {
    innerWidth: 200,
    innerHeight: 70,
    femaleColor: "lightpink",
    maleColor: "lightblue",
    unknownSexColor: "white",
    verticalOffsetChild: 60,
    verticalOffsetParent: -100,
    horizontalOffset: 250,
    size: new Point(180,80)
  },

} as const;

export function getSexColor(sex: ProfileSex): string {
  if (sex === ProfileSex.Male) {
    return profileSvgStyles.profileBox.maleColor;
  }
  if (sex === ProfileSex.Female) {
    return profileSvgStyles.profileBox.femaleColor;
  }
  return profileSvgStyles.profileBox.unknownSexColor;
}


export class RenderProfileSVG extends React.Component<ProfileInfo> {
  render() {
    return (
      <a
        href={"/profile/" + this.props.profile.profileId.itemLink}
        className="Profile"
        key={this.props.profile.profileId.itemLink}
      >
        <rect
          x={this.props.layout.topLeft.x}
          y={this.props.layout.topLeft.y}
          rx="4"
          width={profileSvgStyles.profileBox.innerWidth}
          height={profileSvgStyles.profileBox.innerHeight}
          fill={getSexColor(this.props.profile.sex)}
        />
        <text
          x={this.props.layout.topLeft.x + 10}
          y={this.props.layout.topLeft.y + 20}
          style={profileSvgStyles.mainText}
        >
          {this.props.profile.name}
        </text>
        <text
          x={this.props.layout.topLeft.x + 20}
          y={this.props.layout.topLeft.y + 40}
          style={profileSvgStyles.smallText}
        >
          b.{this.props.profile.birthDate}
        </text>
        <text
          x={this.props.layout.topLeft.x + 20}
          y={this.props.layout.topLeft.y + 55}
          style={profileSvgStyles.smallText}
        >
          d.{this.props.profile.deathDate}
        </text>
      </a>
    );
  }
}
