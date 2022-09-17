import React, { useState } from "react"; // importing FunctionComponent
import { Profile, LocalTreeBackend } from "simple-family-tree-model";

export function generateProfileList(tree: LocalTreeBackend) {
  const profileList = tree.search("");
  const [profiles] = useState(profileList);
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
          {profiles &&
            profiles.map((profile) => (
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
