import React from "react"; // importing FunctionComponent
import { FamilyLayout } from "./family-layout";

export class RenderFamilySVG extends React.Component<FamilyLayout> {
  render() {
    return (
      <a
        href={"/family/" + this.props.familyId}
        className="Family"
        key={this.props.familyId}
      >
        <rect
          x={this.props.rect.topLeft.x}
          y={this.props.rect.topLeft.y}
          rx="4"
          width={this.props.rect.size.x}
          height={this.props.rect.size.y}
          fill="white"
        />
      </a>
    );
  }
}
