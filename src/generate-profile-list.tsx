import React, { useState } from "react"; // importing FunctionComponent
import { TreeBackend } from "simple-family-tree-model";

export function generateProfileList(tree: TreeBackend) {
  const profileList = tree.search("");
  console.log("profiles ", profileList.length);
  //console.log(profileList);
  //const [profiles, setProfile] = useState(profileList);
  //console.log("profiles 3 ", profileList.length);
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
        <tbody>
          {profileList &&
            profileList.map((profile) => (
              <a
                href={"/profile/" + profile.profileId.itemLink}
                className="Profile"
                key={profile.profileId.itemLink}
              >
                <tr key={profile.profileId.itemLink}>
                  <td>{profile.name}</td>
                  <td>{profile.birthDate}</td>
                  <td>{profile.deathDate}</td>
                </tr>
              </a>
            ))}
        </tbody>
      </table>
    </div>
  );
}
