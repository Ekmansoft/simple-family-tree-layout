import React from "react"; // importing FunctionComponent
import { ProfileInfo } from "./profile-info";
import { getSexColor } from "./get-sex-color";
import CSS from "csstype";

const NameStyle: CSS.Properties = {
  backgroundColor: "rgba(255, 255, 255, 0.85)",
  position: "absolute",
  right: 0,
  bottom: "2rem",
  padding: "0.5rem",
  fontFamily: "sans-serif",
  fontSize: "1.5rem",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
};

const SmallStyle: CSS.Properties = {
  backgroundColor: "rgba(255, 255, 255, 0.85)",
  position: "absolute",
  right: 0,
  bottom: "2rem",
  padding: "0.5rem",
  fontFamily: "sans-serif",
  fontSize: "0.9rem",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
};

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
          width={this.props.layout.size.x}
          height={this.props.layout.size.y}
          fill={getSexColor(this.props.profile.sex)}
        />
        )
        <text
          x={this.props.layout.topLeft.x + 10}
          y={this.props.layout.topLeft.y + 20}
          style={NameStyle}
          className="NameStyle"
        >
          {this.props.profile.name}
        </text>
        <text
          x={this.props.layout.topLeft.x + 20}
          y={this.props.layout.topLeft.y + 40}
          style={SmallStyle}
          className="SmallStyle"
        >
          b.{this.props.profile.birthDate}
        </text>
        <text
          x={this.props.layout.topLeft.x + 20}
          y={this.props.layout.topLeft.y + 55}
          style={SmallStyle}
          className="SmallStyle"
        >
          d.{this.props.profile.deathDate}
        </text>
      </a>
    );
  }
}
