import React, { useState } from "react"; // importing FunctionComponent
import { Profile, TreeBackend } from "simple-family-tree-model";

//export class RenderProfileList extends React.Component<TreeBackend> {
export function generateProfileList(tree: TreeBackend) {
  const listData: React.ReactElement[] = [];
  const profileList = tree.search("");
  console.log("profiles ", profileList.length);
  //console.log(profileList);
  //const [profiles, setProfile] = useState(profileList);
  //console.log("profiles 3 ", profileList.length);
  const itemList = profileList.map((profile) => (
    <a
      href={"/profile/" + profile.profileId.itemLink}
      key={profile.profileId.itemLink}
    >
      <tr key={profile.profileId.itemLink}>
        <td>{profile.name}</td>
        <td>{profile.birthDate}</td>
        <td>{profile.deathDate}</td>
      </tr>
    </a>
  ));

  //const itemList =
  // const listItems = profileList.map((profile) =>
  //   <RenderProfileListItem  key={profile.profileId.itemLink} value={profile} />
  // );
  return (
    <div className="container">
      <h3 className="p-3 text-left">Profile list</h3>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Birth</th>
            <th>Death</th>
          </tr>
        </thead>
        <tbody>{itemList}</tbody>
      </table>
    </div>
  );
}
