import React from "react"; // importing FunctionComponent
import { TreeBackend } from "simple-family-tree-model";

//export class RenderProfileList extends React.Component<TreeBackend> {
export function generateProfileList(tree: TreeBackend) {
  //const listData: React.ReactElement[] = [];
  const profileList = tree.search("");
  console.log("profiles ", profileList.length);

  //console.log(profileList);
  //const [profiles, setProfile] = useState(profileList);
  //console.log("profiles 3 ", profileList.length);
  const itemList = profileList.map((profile) => (
    <tr key={profile.profileId.itemLink}>
      <td style={{width: '150px',textAlign:'left',fontSize:'0.8rem'}}><a style={{color:'white'}} href={"/profile/" + profile.profileId.itemLink}>
              {profile.name}</a></td>
      <td style={{width: '80px',textAlign:'left',fontSize:'0.8rem'}}>{profile.birthDate}</td>
      <td style={{width: '80px',textAlign:'left',fontSize:'0.8rem'}}>{profile.deathDate}</td>
    </tr>
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
            <th style={{width: '150px',textAlign:'left',fontSize:'0.8rem'}}>Name</th>
            <th style={{width: '80px',textAlign:'left',fontSize:'0.8rem'}}>Birth</th>
            <th style={{width: '80px',textAlign:'left',fontSize:'0.8rem'}}>Death</th>
          </tr>
        </thead>
        <tbody>{itemList}</tbody>
      </table>
    </div>
  );
}
