import React from "react"; // importing FunctionComponent
import { Profile } from "simple-family-tree-model";

export class RenderProfileListItem extends React.Component<Profile> {
  render() {
    return (
      <a
        href={"/profile/" + this.props.profileId.itemLink}
        key={this.props.profileId.itemLink}
      >
        <tr key={this.props.profileId.itemLink}>
          <td>{this.props.name}</td>
          <td>{this.props.birthDate}</td>
          <td>{this.props.deathDate}</td>
        </tr>
      </a>);
  }
}


// export class RenderProfileList extends React.Component<Profile[]> {
//   const profiles =
//   render() {
//     return (
//       <RenderProfileListItem {this.props.profiles}
