import React from "react"; // importing FunctionComponent
import './generate-profile-list.css';
import { TreeBackend } from "simple-family-tree-model";

//export class RenderProfileList extends React.Component<TreeBackend> {
export function generateProfileList(tree: TreeBackend) {
  //const listData: React.ReactElement[] = [];
  const profileList = tree.search("");
  console.log("profiles ", profileList.length);

  const itemList = profileList.map((profile) => (
    <tr key={profile.profileId.itemLink}>
      <td className="prName">
        <a href={"/profile/" + profile.profileId.itemLink} >
          {profile.name}
        </a>
      </td>
      <td className="prEvent">
        {profile.birthDate}
      </td>
      <td className="prEvent">
        {profile.deathDate}
      </td>
    </tr>
  ));

  return (
    <div className="container">
      <table className="prListTable">
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Birth
            </th>
            <th>
              Death
            </th>
          </tr>
        </thead>
        <tbody>{itemList}</tbody>
      </table>
    </div>
  );
}
