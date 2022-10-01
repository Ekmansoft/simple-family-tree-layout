import React from "react"; // importing FunctionComponent
import { ProfileInfo } from "./profile-info";
import { getSexColor } from "./get-sex-color";

const styles = {
  smallText: {
    fontSize: "0.9rem",
  },
  mainText: {
    fontSize: "1.5rem",
  },
} as const;

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
          style={styles.mainText}
        >
          {this.props.profile.name}
        </text>
        <text
          x={this.props.layout.topLeft.x + 20}
          y={this.props.layout.topLeft.y + 40}
          style={styles.smallText}
        >
          b.{this.props.profile.birthDate}
        </text>
        <text
          x={this.props.layout.topLeft.x + 20}
          y={this.props.layout.topLeft.y + 55}
          style={styles.smallText}
        >
          d.{this.props.profile.deathDate}
        </text>
      </a>
    );
  }
}
