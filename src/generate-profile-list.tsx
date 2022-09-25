import React from "react"; // importing FunctionComponent
import { TreeBackend } from "simple-family-tree-model";

const styles = {
  prList: {
    color: "white",
    textAlign: "left",
    fontSize: "0.4em",
  },
  prListLink: {
    color: "white",
  }
} as const;

//export class RenderProfileList extends React.Component<TreeBackend> {
export function generateProfileList(tree: TreeBackend) {
  //const listData: React.ReactElement[] = [];
  const profileList = tree.search("");
  console.log("profiles ", profileList.length);

  const itemList = profileList.map((profile) => (
    <tr key={profile.profileId.itemLink}>
      <td>
        <a href={"/profile/" + profile.profileId.itemLink} style={styles.prListLink}>{profile.name}</a>
      </td>
      <td>{profile.birthDate}</td>
      <td>{profile.deathDate}</td>
    </tr>
  ));

  return (
    <div className="container">
      <table style={styles.prList}>
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
