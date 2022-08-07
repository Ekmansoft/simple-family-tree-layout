import React from 'react'; // importing FunctionComponent
import { ProfileInfo } from './profile-info';
import { getSexColor } from './get-sex-color';

export class RenderProfileSVG extends React.Component<ProfileInfo> {
    render() {
      return (
        <a href={"/profile/"+this.props.profile.profileId.itemLink} className="Profile" key={this.props.profile.profileId.itemLink}>
          <rect x={this.props.layout.topLeft.x} y={this.props.layout.topLeft.y} rx="4" width={this.props.layout.size.x} height={this.props.layout.size.y} fill={getSexColor(this.props.profile.getSex())} />)
          <text x={this.props.layout.topLeft.x+10} y={this.props.layout.topLeft.y+20} className="NameStyle" >{this.props.profile.name}</text>
          <text x={this.props.layout.topLeft.x+20} y={this.props.layout.topLeft.y+40} className="SmallStyle">b.{this.props.profile.birthDate}</text>
          <text x={this.props.layout.topLeft.x+20} y={this.props.layout.topLeft.y+55} className="SmallStyle">d.{this.props.profile.deathDate}</text>
        </a>
      );
    }
  }
